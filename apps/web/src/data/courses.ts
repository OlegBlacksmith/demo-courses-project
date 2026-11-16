import type { Locale } from "next-intl";
import "server-only";
import { prisma } from "./prisma";
import type { CatalogCourseDTO } from "./dtos/catalog-course-dto";
import type { Prisma } from "@/generated/prisma/client";

const HOME_COURSES_LIMIT = 8;

const catalogCourseArgs = {
  select: {
    publicUId: true,
    description: true,
    slug: true,
    translations: {
      where: {
        locale: "EN",
        status: "PUBLISHED",
      },
      select: {
        description: true,
        title: true,
        slug: true,
      },
    },
    title: true,
    picture: true,
    price: true,
  },
} satisfies Prisma.CourseDefaultArgs;

const publishedCourseWhere = {
  status: "PUBLISHED",
  deletedAt: null,
} satisfies Prisma.CourseWhereInput;

type CatalogCourseRow = Prisma.CourseGetPayload<typeof catalogCourseArgs>;

function toCatalogCourseDTO(
  course: CatalogCourseRow,
  locale: Locale,
): CatalogCourseDTO {
  const translation = locale === "en" ? course.translations[0] : undefined;
  return {
    publicUId: course.publicUId,
    description: translation?.description || course.description,
    title: translation?.title || course.title,
    picture: course.picture,
    price: course.price,
    slug: translation?.slug || course.slug,
  };
}

export async function getCatalogCourses(
  locale: Locale,
): Promise<CatalogCourseDTO[]> {
  const courses = await prisma.course.findMany({
    ...catalogCourseArgs,
    where: publishedCourseWhere,
    orderBy: {
      indexNumber: "asc",
    },
  });

  return courses.map((course) => toCatalogCourseDTO(course, locale));
}

export async function getHomeCourses(
  locale: Locale,
): Promise<CatalogCourseDTO[]> {
  const courses = await prisma.course.findMany({
    ...catalogCourseArgs,
    take: HOME_COURSES_LIMIT,
    where: { ...publishedCourseWhere, showOnHome: true },
    orderBy: {
      indexNumber: "asc",
    },
  });

  return courses.map((course) => toCatalogCourseDTO(course, locale));
}
