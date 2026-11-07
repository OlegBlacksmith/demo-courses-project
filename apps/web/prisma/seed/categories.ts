import type { PrismaClient } from "../../src/generated/prisma/client";

export async function seedCategories(prisma: PrismaClient) {
  const frontend = await prisma.courseCategory.create({
    data: {
      title: "Фронтенд",
      description: "Курсы по разработке интерфейсов",
      slug: "frontend",
      indexNumber: 1,
      status: "PUBLISHED",
    },
  });

  const devops = await prisma.courseCategory.create({
    data: {
      title: "DevOps",
      description: "Контейнеры, деплой и инфраструктура",
      slug: "devops",
      indexNumber: 2,
      status: "PUBLISHED",
    },
  });

  const backend = await prisma.courseCategory.create({
    data: {
      title: "Бэкенд",
      description: "Курсы по разработке серверной части",
      slug: "backend",
      indexNumber: 3,
      status: "PUBLISHED",
    },
  });

  return { frontend, devops, backend };
}