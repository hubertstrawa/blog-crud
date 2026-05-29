import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      return !!(await this.prisma.like.create({
        data: { postId, userId },
      }));
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to like post');
    }
  }

  async unlikePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      return !!(await this.prisma.like.delete({
        where: { userId_postId: { userId, postId } },
      }));
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to unlike post');
    }
  }

  async getPostLikesCount(postId: number) {
    return await this.prisma.like.count({
      where: { postId },
    });
  }

  async userLikedPost({ postId, userId }: { postId: number; userId: number }) {
    return !!(await this.prisma.like.findFirst({
      where: { userId, postId },
    }));
  }
}
