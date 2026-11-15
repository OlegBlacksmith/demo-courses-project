import type { Locale } from "next-intl";
import "server-only";
import { prisma } from "./prisma";
import type { CatalogCourseDTO } from "./dtos/catalog-course-dto";

export async function getCatalogCourses(
  locale: Locale
): Promise<CatalogCourseDTO[]> {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    orderBy: {
      indexNumber: "asc",
    },
    select: {
      publicUId: true,
      description: true,
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
      slug: true,
    },
  });

  return courses.map((course) => {
    const translation = locale === "en" ? course.translations[0] : undefined;
    return {
      publicUId: course.publicUId,
      description: translation?.description || course.description,
      title: translation?.title || course.title,
      picture: course.picture,
      price: course.price,
      slug: translation?.slug || course.slug,
    };
  });
}
