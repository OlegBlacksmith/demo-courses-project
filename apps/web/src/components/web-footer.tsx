import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function WebFooter() {
  const t = useTranslations("Footer");
  return (
    <footer className="flex px-4 py-4 mb-4 mt-4">
      <Link href="/">{t("siteName")}</Link>
    </footer>
  );
}
