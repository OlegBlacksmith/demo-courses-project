import "server-only";
import type { UserProgressDTO } from "./dtos/user-progress-dto";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "./prisma";

export async function getUserProgress(
  userPublicUId: string,
  coursePublicUId: string,
): Promise<UserProgressDTO> {
  const lessonFilter: Prisma.LessonWhereInput = {
    deletedAt: null,
    status: "PUBLISHED",
    module: {
      deletedAt: null,
      status: "PUBLISHED",
      course: {
        publicUId: coursePublicUId,
        deletedAt: null,
      },
    },
  };

  const totalLessons = await prisma.lesson.count({
    where: lessonFilter,
  });

  const completedLessons = await prisma.lessonProgress.count({
    where: {
      user: {
        publicUId: userPublicUId,
      },
      completedAt: {
        not: null,
      },
      lesson: lessonFilter,
    },
  });

  const percent =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return {
    completedLessons,
    totalLessons,
    percent,
  };
}
