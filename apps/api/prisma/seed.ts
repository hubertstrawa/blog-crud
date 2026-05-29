import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';
import * as argon2 from 'argon2';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

function generateSlug(title: string) {
  return title.toLowerCase().replace(/ /g, '-');
}

async function main() {
  const defaultPassword = await argon2.hash('123456');
  const users = Array.from({ length: 200 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 100 }, () => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.urlLoremFlickr(),
    published: true,
    authorId: faker.number.int({ min: 1, max: 200 }),
  }));

  await Promise.all(
    posts.map(async (post) => {
      await prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: 100 }, () => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 200 }),
              })),
            },
          },
        },
      });
    }),
  );

  console.log('Database seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('All good');
    process.exit(0);
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error(error);
    process.exit(1);
  });
