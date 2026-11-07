import type { PrismaClient } from "../../src/generated/prisma/client";
import type { seedCourses } from "./courses";
import type { seedUsers } from "./users";

export async function seedAccess(
  prisma: PrismaClient,
  users: Awaited<ReturnType<typeof seedUsers>>,
  courses: Awaited<ReturnType<typeof seedCourses>>,
) {
  const access1 = await prisma.enrollment.create({
    data: {
      user: { connect: { id: users.admin.id } },
      course: { connect: { id: courses.frontendCourse.id } },
    },
  });

  await prisma.lessonProgress.create({
    data: {
      user: { connect: { id: users.admin.id } },
      lesson: {
        connect: { id: courses.frontendCourse.modules[1].lessons[0].id },
      },
      completedAt: new Date(),
    },
  });

  await prisma.lessonProgress.create({
    data: {
      user: { connect: { id: users.admin.id } },
      lesson: {
        connect: { id: courses.frontendCourse.modules[0].lessons[0].id },
      },
    },
  });

  const access2 = await prisma.enrollment.create({
    data: {
      user: { connect: { id: users.curator.id } },
      course: { connect: { id: courses.backendCourse.id } },
    },
  });

  const access3 = await prisma.enrollment.create({
    data: {
      user: { connect: { id: users.instructor.id } },
      course: { connect: { id: courses.frontendCourse.id } },
    },
  });

  const access4 = await prisma.enrollment.create({
    data: {
      user: { connect: { id: users.user.id } },
      course: { connect: { id: courses.backendCourse.id } },
    },
  });

  return { access1, access2, access3, access4 };
}
