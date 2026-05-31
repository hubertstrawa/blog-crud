import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';
import { PostPublishedEvent } from 'src/messaging/newsletter-events';
import { RabbitMqService } from 'src/messaging/rabbitmq.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsletterEmailConsumer implements OnModuleInit {
  private readonly logger = new Logger(NewsletterEmailConsumer.name);
  private readonly webBaseUrl: string;

  constructor(
    private readonly rabbitMqService: RabbitMqService,
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    configService: ConfigService,
  ) {
    this.webBaseUrl =
      configService.get<string>('NEWSLETTER_PUBLIC_BASE_URL') ??
      'http://localhost:3000';
  }

  async onModuleInit() {
    await this.rabbitMqService.consumePostPublished(async (event) => {
      await this.handlePostPublished(event);
    });
  }

  private async handlePostPublished(event: PostPublishedEvent) {
    const subscribers = await this.prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      select: { id: true, email: true },
    });

    if (!subscribers.length) {
      return;
    }

    for (const subscriber of subscribers) {
      try {
        await this.prisma.newsletterDelivery.create({
          data: {
            postId: event.postId,
            subscriberId: subscriber.id,
          },
        });
      } catch {
        // Duplicate (subscriberId + postId), skip re-send.
        continue;
      }

      const slugOrId = event.slug ?? String(event.postId);
      const postUrl = `${this.webBaseUrl}/posts/${slugOrId}`;

      await this.mailerService.sendNewPostEmail({
        to: subscriber.email,
        title: event.title,
        postUrl,
      });
    }

    this.logger.log(`Newsletter handled for post #${event.postId}`);
  }
}
