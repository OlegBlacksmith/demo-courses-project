import type { CatalogCourseDTO } from "@/data/dtos/catalog-course-dto";

export function CourseCard({ course }: { course: CatalogCourseDTO }) {
  return (
    <article className="border rounded-sm p-3">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </article>
  );
}
