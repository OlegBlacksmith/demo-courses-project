import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { clearDatabase } from "./seed/clear";
import { seedCategories } from "./seed/categories";
import { seedCourses } from "./seed/courses";
import { seedUsers } from "./seed/users";
import { seedAccess } from "./seed/access";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await clearDatabase(prisma);
  const categories = await seedCategories(prisma);
  const users = await seedUsers(prisma);
  const courses = await seedCourses(prisma, categories, users);
  await seedAccess(prisma, users, courses);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());