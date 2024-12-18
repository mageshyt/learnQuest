const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          name: "Computer Science",
        },
        {
          name: "Music",
        },
        {
          name: "Photography",
        },
        {
          name: "Programming",
        },
        {
          name: "Engineering",
        },
        {
          name: "Accounting",
        },
        {
          name: "Filming",
        },
        {
          name: "Fitness",
        },
      ],
    });

    console.log("Categories seeded successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await database.$disconnect();
  }
}

main();
