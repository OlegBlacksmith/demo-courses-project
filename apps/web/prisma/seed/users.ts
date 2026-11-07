import type { PrismaClient } from "../../src/generated/prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const admin = await prisma.user.create({
    data: {
      bio: "Test user bio",
      firstName: "Test1",
      lastName: "Testov1",
      patronymic: "Testovich1",
      avatar: "www.example.com/avatar.jpg",
      email: "test1@example.com",
      userRole: "ADMIN",
      emailVerified: true,
      passwordHash: "non-empty-string",
      tel: "88005553535",
    },
  });

  const user = await prisma.user.create({
    data: {
        bio: "Test user bio",
        firstName: "Test2",
        lastName: "Testov2",
        patronymic: "Testovich2",
        avatar: "www.example.com/avatar.jpg",
        email: "test2@example.com",
        emailVerified: true,
        passwordHash: "non-empty-string",
        tel: "88006663636",
    },
  });

  const curator = await prisma.user.create({
    data: {
        bio: "Test user bio",
        firstName: "Test3",
        lastName: "Testov3",
        patronymic: "Testovich3",
        avatar: "www.example.com/avatar.jpg",
        email: "test3@example.com",
        userRole: "CURATOR",
        emailVerified: true,
        passwordHash: "non-empty-string",
        tel: "88007773737",
    },
  });

  const instructor = await prisma.user.create({
    data: {
        bio: "Test user bio",
        firstName: "Test4",
        lastName: "Testov4",
        patronymic: "Testovich4",
        avatar: "www.example.com/avatar.jpg",
        email: "test4@example.com",
        userRole: "INSTRUCTOR",
        emailVerified: true,
        passwordHash: "non-empty-string",
        tel: "88008883838",
    },
  });
  return { admin, user, curator, instructor };
}
