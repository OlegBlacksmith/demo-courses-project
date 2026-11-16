import type { PrismaClient } from "../../src/generated/prisma/client";

// Тестовые курсы для вёрстки витрины (грид главной, каталог).
// Без модулей и уроков. Контрольные курсы для прогресса — в courses.ts.

type CategoryKey = "frontend" | "backend" | "devops";

type ShowcaseCourse = {
  category: CategoryKey;
  showOnHome: boolean;
  price: number;
  ru: { title: string; description: string; slug: string };
  en?: { title: string; description: string; slug: string };
};

const showcaseCourses: ShowcaseCourse[] = [
  {
    category: "frontend",
    showOnHome: true,
    price: 19000,
    ru: {
      title: "React с нуля",
      description: "Компоненты, состояние и хуки на практике.",
      slug: "react-s-nulya",
    },
    en: {
      title: "React from Scratch",
      description: "Components, state and hooks in practice.",
      slug: "react-from-scratch",
    },
  },
  {
    category: "frontend",
    showOnHome: true,
    price: 22000,
    ru: {
      title: "TypeScript для фронтенда",
      description:
        "Типы, дженерики, сужение типов и типизация React-компонентов. Разбираем, как TypeScript ловит ошибки до запуска и как не утонуть в сложных типах.",
      slug: "typescript-dlya-frontenda",
    },
    en: {
      title: "TypeScript for Frontend",
      description:
        "Types, generics, narrowing and typing React components. How TypeScript catches errors before runtime and how not to drown in complex types.",
      slug: "typescript-for-frontend",
    },
  },
  {
    category: "frontend",
    showOnHome: true,
    price: 27000,
    ru: {
      title: "Next.js: App Router",
      description: "Маршруты, серверные компоненты, кэширование.",
      slug: "nextjs-app-router",
    },
    en: {
      title: "Next.js: App Router",
      description: "Routing, Server Components, caching.",
      slug: "nextjs-app-router-en",
    },
  },
  {
    category: "frontend",
    showOnHome: true,
    price: 15000,
    ru: {
      title: "Вёрстка на Tailwind CSS",
      description:
        "Утилитарные классы, адаптивная сетка, тёмная тема и собственные токены дизайна.",
      slug: "verstka-na-tailwind",
    },
    // Без английского перевода: на /en курс показывается на русском.
  },
  {
    category: "backend",
    showOnHome: true,
    price: 29000,
    ru: {
      title: "Python и FastAPI",
      description: "REST API, валидация, асинхронность и тесты.",
      slug: "python-i-fastapi",
    },
    en: {
      title: "Python and FastAPI",
      description: "REST APIs, validation, async and tests.",
      slug: "python-and-fastapi",
    },
  },
  {
    category: "backend",
    showOnHome: true,
    price: 32000,
    ru: {
      title: "PostgreSQL для разработчиков",
      description:
        "Индексы, планы запросов, транзакции и уровни изоляции. Учимся читать EXPLAIN и понимать, почему запрос медленный, ещё до того, как его заметят пользователи.",
      slug: "postgresql-dlya-razrabotchikov",
    },
    en: {
      title: "PostgreSQL for Developers",
      description:
        "Indexes, query plans, transactions and isolation levels. Learn to read EXPLAIN and see why a query is slow before users notice.",
      slug: "postgresql-for-developers",
    },
  },
  {
    category: "backend",
    showOnHome: true,
    price: 24000,
    ru: {
      title: "Node.js на сервере",
      description: "Событийный цикл, потоки и обработка ошибок.",
      slug: "nodejs-na-servere",
    },
    en: {
      title: "Node.js on the Server",
      description: "Event loop, streams and error handling.",
      slug: "nodejs-on-the-server",
    },
  },
  {
    category: "devops",
    showOnHome: true,
    price: 31000,
    ru: {
      title: "Docker и Compose",
      description: "Образы, слои, сети и тома. Собираем окружение проекта.",
      slug: "docker-i-compose",
    },
    en: {
      title: "Docker and Compose",
      description: "Images, layers, networks and volumes. Building a project environment.",
      slug: "docker-and-compose",
    },
  },
  {
    category: "devops",
    showOnHome: true,
    price: 26000,
    ru: {
      title: "CI на GitHub Actions",
      description: "Линтеры, тесты и сборка на каждый PR.",
      slug: "ci-na-github-actions",
    },
    en: {
      title: "CI with GitHub Actions",
      description: "Linters, tests and builds on every PR.",
      slug: "ci-with-github-actions",
    },
  },
  {
    category: "devops",
    showOnHome: false,
    price: 34000,
    ru: {
      title: "Kubernetes: первые шаги",
      description: "Поды, деплойменты и сервисы. Только в каталоге, не на главной.",
      slug: "kubernetes-pervye-shagi",
    },
    en: {
      title: "Kubernetes: First Steps",
      description: "Pods, deployments and services. Catalog only, not on the home page.",
      slug: "kubernetes-first-steps",
    },
  },
];

export async function seedShowcaseCourses(
  prisma: PrismaClient,
  categories: Record<CategoryKey, { id: number }>,
  users: { instructor: { id: number } },
  startIndexNumber: number,
) {
  for (const [index, course] of showcaseCourses.entries()) {
    await prisma.course.create({
      data: {
        title: course.ru.title,
        description: course.ru.description,
        slug: course.ru.slug,
        picture: `https://example.com/${course.ru.slug}.jpg`,
        price: course.price,
        indexNumber: startIndexNumber + index,
        status: "PUBLISHED",
        showOnHome: course.showOnHome,
        category: { connect: { id: categories[course.category].id } },
        instructors: {
          create: [
            {
              courseInstructorRole: "LEAD",
              user: { connect: { id: users.instructor.id } },
            },
          ],
        },
        translations: course.en
          ? {
              create: [
                {
                  locale: "EN",
                  title: course.en.title,
                  description: course.en.description,
                  slug: course.en.slug,
                  status: "PUBLISHED",
                },
              ],
            }
          : undefined,
      },
    });
  }
}
