import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { Channel, ConsumeMessage } from 'amqplib';
import {
  NEWSLETTER_EXCHANGE,
  POST_PUBLISHED_QUEUE,
  POST_PUBLISHED_ROUTING_KEY,
  PostPublishedEvent,
} from './newsletter-events';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMqService.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly rabbitMqUrl: string;

  constructor(configService: ConfigService) {
    this.rabbitMqUrl =
      configService.get<string>('RABBITMQ_URL') ?? 'amqp://localhost:5672';
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  async publishPostPublished(event: PostPublishedEvent) {
    const channel = await this.ensureChannel();
    channel.publish(
      NEWSLETTER_EXCHANGE,
      POST_PUBLISHED_ROUTING_KEY,
      Buffer.from(JSON.stringify(event)),
      { persistent: true },
    );
  }

  async consumePostPublished(
    handler: (event: PostPublishedEvent) => Promise<void>,
  ) {
    const channel = await this.ensureChannel();

    await channel.consume(POST_PUBLISHED_QUEUE, async (message) => {
      if (!message) {
        return;
      }

      await this.processMessage(message, handler);
    });
  }

  private async processMessage(
    message: ConsumeMessage,
    handler: (event: PostPublishedEvent) => Promise<void>,
  ) {
    const channel = await this.ensureChannel();
    try {
      const event = JSON.parse(
        message.content.toString(),
      ) as PostPublishedEvent;
      await handler(event);
      channel.ack(message);
    } catch (error) {
      this.logger.error('Failed to process newsletter event', error);
      channel.nack(message, false, true);
    }
  }

  private async ensureChannel() {
    if (!this.channel) {
      await this.connect();
    }
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }
    return this.channel;
  }

  private async connect() {
    if (this.channel) {
      return;
    }

    this.connection = await amqp.connect(this.rabbitMqUrl);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(NEWSLETTER_EXCHANGE, 'topic', {
      durable: true,
    });
    await this.channel.assertQueue(POST_PUBLISHED_QUEUE, { durable: true });
    await this.channel.bindQueue(
      POST_PUBLISHED_QUEUE,
      NEWSLETTER_EXCHANGE,
      POST_PUBLISHED_ROUTING_KEY,
    );
    this.logger.log('RabbitMQ connection established');
  }
}
