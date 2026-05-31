import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const subscriber = await this.prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: { isActive: true },
      create: { email: normalizedEmail },
    });

    return {
      id: subscriber.id,
      email: subscriber.email,
      isActive: subscriber.isActive,
    };
  }

  async unsubscribe(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (!subscriber) {
      return { email: normalizedEmail, isActive: false };
    }

    const updated = await this.prisma.newsletterSubscriber.update({
      where: { email: normalizedEmail },
      data: { isActive: false },
    });

    return { email: updated.email, isActive: updated.isActive };
  }
}
