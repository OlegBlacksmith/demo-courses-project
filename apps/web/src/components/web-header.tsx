import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

export function WebHeader() {
  const t = useTranslations("Header");
  return (
    <header className="flex items-center justify-between px-4 py-4 mb-4 mt-4">
      <Link href="/">{t("siteName")}</Link>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
