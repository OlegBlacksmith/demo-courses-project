import { HomeCourses } from "@/components/home-courses";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Suspense fallback={<p>{t("cardSuspense")}</p>}>
        <HomeCourses />
      </Suspense>
    </div>
  );
}
