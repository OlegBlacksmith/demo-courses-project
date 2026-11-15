import type { PrismaClient } from "../../src/generated/prisma/client";

export async function clearDatabase(prisma: PrismaClient) {
  await prisma.reviewModeration.deleteMany();
  await prisma.review.deleteMany();
  await prisma.promoCodeUsage.deleteMany();
  await prisma.promoCodeAttempt.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.promoCodeUser.deleteMany();
  await prisma.promoCodeCourse.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.promotionTranslation.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.moduleInstructor.deleteMany();
  await prisma.courseInstructor.deleteMany();
  await prisma.componentTranslation.deleteMany();
  await prisma.component.deleteMany();
  await prisma.lessonTranslation.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.moduleTranslation.deleteMany();
  await prisma.module.deleteMany();
  await prisma.courseTranslation.deleteMany();
  await prisma.course.deleteMany();
  await prisma.courseCategoryTranslation.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.user.deleteMany();
}
