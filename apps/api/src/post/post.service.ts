import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { id },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async findByUser({
    userId,
    skip,
    take,
  }: {
    userId: number;
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        content: true,
        published: true,
        createdAt: true,
        slug: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async userPostCount(userId: number) {
    return await this.prisma.post.count({
      where: { authorId: userId },
    });
  }

  async create({
    createPostInput,
    authorId,
  }: {
    createPostInput: CreatePostInput;
    authorId: number;
  }) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async update({
    updatePostInput,
    userId,
  }: {
    updatePostInput: UpdatePostInput;
    userId: number;
  }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: updatePostInput.postId, authorId: userId },
    });

    if (!authorIdMatched) {
      throw new UnauthorizedException('You are not the author of this post');
    }

    const { postId, ...data } = updatePostInput;

    return await this.prisma.post.update({
      where: { id: updatePostInput.postId },
      data: {
        ...data,
        tags: {
          set: [],
          connectOrCreate: updatePostInput.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async delete({ postId, userId }: { postId: number; userId: number }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: postId, authorId: userId },
    });

    if (!authorIdMatched) {
      throw new UnauthorizedException('You are not the author of this post');
    }

    const result = await this.prisma.post.delete({
      where: { id: postId, authorId: userId },
    });

    return !!result;
  }
}
