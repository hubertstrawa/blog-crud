import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/mailer.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewsletterController } from './newsletter.controller';
import { NewsletterEmailConsumer } from './newsletter-email.consumer';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [MessagingModule, MailerModule],
  controllers: [NewsletterController],
  providers: [NewsletterService, NewsletterEmailConsumer, PrismaService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
