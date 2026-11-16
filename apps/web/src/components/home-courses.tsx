import { CourseCard } from "./course-card";
import { getLocale } from "next-intl/server";
import { getHomeCourses } from "@/data/courses";

export async function HomeCourses() {
  const locale = await getLocale();
  const courses = await getHomeCourses(locale);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.publicUId} course={course} />
      ))}
    </div>
  );
}
