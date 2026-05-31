import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [MessagingModule],
  providers: [PostResolver, PostService, PrismaService],
})
export class PostModule {}
