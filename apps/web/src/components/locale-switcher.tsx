"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels = { en: "English", ru: "Русский" };

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          disabled={locale === currentLocale}
          className="px-2 py-1 rounded disabled:bg-foreground disabled:text-background"
          onClick={() => router.replace(pathname, { locale })}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
