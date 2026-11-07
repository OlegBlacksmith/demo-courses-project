import type { PrismaClient } from "../../src/generated/prisma/client";

export async function seedCourses(
  prisma: PrismaClient,
  categories: {
    frontend: { id: number };
    devops: { id: number };
    backend: { id: number };
  },
  users: { instructor: { id: number } },
) {
  const frontendCourse = await prisma.course.create({
    data: {
      description: "Современный курс по разработке интерфейсов",
      title: "Фронтенд-разработка",
      picture: "https://example.com/frontend-course.jpg",
      price: 25000,
      instructors: {
        create: [
          {
            courseInstructorRole: "LEAD",
            user: { connect: { id: users.instructor.id } },
          },
        ],
      },
      indexNumber: 1,
      category: { connect: { id: categories.frontend.id } },
      slug: "kurs-po-frontendu",
      status: "PUBLISHED",
      translations: {
        create: [
          {
            locale: "EN",
            title: "Frontend Development Course",
            description: "Modern frontend development course",
            slug: "frontend-development-course",
            status: "PUBLISHED",
          },
        ],
      },
      modules: {
        create: [
          {
            title: "Основы",
            description: "...",
            slug: "osnovy",
            indexNumber: 1,
            status: "PUBLISHED",
            lessons: {
              create: [
                {
                  title: "Введение",
                  description: "...",
                  slug: "vvedenie",
                  indexNumber: 1,
                  status: "PUBLISHED",
                  components: {
                    create: [
                      {
                        title: "Текст урока",
                        techDescription: "seed",
                        type: "TEXT",
                        indexNumber: 1,
                        content: { text: "Привет, это первый урок" },
                      },
                    ],
                  },
                },
                {
                  title: "Второй урок",
                  description: "...",
                  slug: "vtoroy-urok",
                  indexNumber: 2,
                  status: "DRAFT",
                  components: {
                    create: [
                      {
                        title: "Текст урока",
                        techDescription: "seed",
                        type: "TEXT",
                        indexNumber: 1,
                        content: { text: "Привет, это первый урок" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Написание кода",
            description: "...",
            slug: "napisanie-koda",
            indexNumber: 2,
            status: "PUBLISHED",
            lessons: {
              create: [
                {
                  title: "Введение",
                  description: "...",
                  slug: "vvedenie",
                  indexNumber: 1,
                  status: "PUBLISHED",
                  components: {
                    create: [
                      {
                        title: "Текст урока",
                        techDescription: "seed",
                        type: "TEXT",
                        indexNumber: 1,
                        content: { text: "Привет, это первый урок" },
                      },
                    ],
                  },
                },
                {
                  title: "Второй урок",
                  description: "...",
                  slug: "vtoroy-urok",
                  indexNumber: 2,
                  status: "DRAFT",
                  components: {
                    create: [
                      {
                        title: "Текст урока",
                        techDescription: "seed",
                        type: "TEXT",
                        indexNumber: 1,
                        content: { text: "Привет, это первый урок" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      modules: {
        orderBy: { indexNumber: "asc" },
        include: { lessons: { orderBy: { indexNumber: "asc" } } },
      },
    },
  });

  const backendCourse = await prisma.course.create({
    data: {
      description: "Современный курс по разработке серверной части",
      title: "Бэкенд-разработка",
      picture: "https://example.com/backend-course.jpg",
      price: 30000,
      instructors: {
        create: [
          {
            courseInstructorRole: "LEAD",
            user: { connect: { id: users.instructor.id } },
          },
        ],
      },
      indexNumber: 2,
      category: { connect: { id: categories.backend.id } },
      slug: "kurs-po-backendu",
      status: "HIDDEN",
      translations: {
        create: [
          {
            locale: "EN",
            title: "Backend Development Course",
            description: "Modern backend development course",
            slug: "backend-development-course",
            status: "DRAFT",
          },
        ],
      },
    },
  });

  const devopsCourse = await prisma.course.create({
    data: {
      description: "Современный курс по DevOps",
      title: "DevOps",
      picture: "https://example.com/devops-course.jpg",
      price: 35000,
      instructors: {
        create: [
          {
            courseInstructorRole: "LEAD",
            user: { connect: { id: users.instructor.id } },
          },
        ],
      },
      indexNumber: 3,
      category: { connect: { id: categories.devops.id } },
      slug: "kurs-po-devops",
      status: "DRAFT",
      translations: {
        create: [
          {
            locale: "EN",
            title: "DevOps Development Course",
            description: "Modern DevOps course",
            slug: "devops-development-course",
            status: "PUBLISHED",
          },
        ],
      },
    },
  });

  return { frontendCourse, backendCourse, devopsCourse };
}
