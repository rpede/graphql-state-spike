import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.profile.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      firstName: 'Joe',
      lastName: 'Doe',
      posts: {
        create: {
          title: 'Hello world',
          body: `
Earum quasi et accusantium officia velit vitae fugit. Et rem id et molestias ut. Sint quasi illo quisquam quaerat excepturi.

Sit esse voluptatem quis ea. Optio libero tempore et eveniet quam eaque qui porro. Reiciendis aut inventore delectus repudiandae numquam sapiente reiciendis.

Nihil occaecati ex sit enim nulla cumque id. Sint rerum eaque molestiae necessitatibus ipsa nihil ea. Nihil sed voluptas accusamus quibusdam.

Magnam sequi ab itaque sint ut. Quos tempore sit veritatis maxime aut totam. Perspiciatis voluptatem rerum quis laborum vel occaecati. Laboriosam quia odio suscipit blanditiis. Ut non voluptas earum omnis.

Amet rem sed qui aut fugit sit recusandae. Et quia quia omnis minus maxime reiciendis aut. Reiciendis vitae unde tempore nihil nobis suscipit dolores provident.
      `,
        },
      },
    },
  });

  const bob = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Alice',
      lastName: 'Smith',
      posts: {
        create: [
          {
            title: 'Another amazing post',
          },
          {
            title: 'Will this be the new WordPress?',
            body: 'No, of cause not.',
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
