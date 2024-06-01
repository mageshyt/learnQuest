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
          name: "Web Development",
        },
        {
          name: "App Development",
        },
        {
          name: "Data Science",
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
