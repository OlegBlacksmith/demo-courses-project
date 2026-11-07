CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "ComponentType" AS ENUM ('TEXT', 'VIDEO', 'IMAGE', 'CODE');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'HIDDEN', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('PUBLISHED', 'DRAFT');

-- CreateEnum
CREATE TYPE "TranslationStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "TranslationLocale" AS ENUM ('EN');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'CURATOR', 'INSTRUCTOR');

-- CreateEnum
CREATE TYPE "CourseInstructorRole" AS ENUM ('LEAD', 'CO_AUTHOR');

-- CreateEnum
CREATE TYPE "ModuleInstructorRole" AS ENUM ('AUTHOR', 'TEACHER');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "picture" VARCHAR(500) NOT NULL,
    "price" INTEGER NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "slug" VARCHAR(300) NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTranslation" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TranslationStatus" NOT NULL DEFAULT 'DRAFT',
    "slug" VARCHAR(300) NOT NULL,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleTranslation" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "status" "TranslationStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "ModuleTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonTranslation" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "status" "TranslationStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "LessonTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "techDescription" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" JSONB NOT NULL,
    "type" "ComponentType" NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "indexNumber" INTEGER NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentTranslation" (
    "id" SERIAL NOT NULL,
    "componentId" INTEGER NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(250) NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TranslationStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "ComponentTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "indexNumber" INTEGER NOT NULL,
    "slug" VARCHAR(300) NOT NULL,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategoryTranslation" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TranslationStatus" NOT NULL DEFAULT 'DRAFT',
    "title" VARCHAR(250) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,

    CONSTRAINT "CourseCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "patronymic" VARCHAR(100),
    "avatar" VARCHAR(300),
    "email" VARCHAR(255) NOT NULL,
    "userRole" "UserRole" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT NOT NULL,
    "tel" VARCHAR(25),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseInstructor" (
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseInstructorRole" "CourseInstructorRole" NOT NULL DEFAULT 'CO_AUTHOR',

    CONSTRAINT "CourseInstructor_pkey" PRIMARY KEY ("courseId","userId")
);

-- CreateTable
CREATE TABLE "ModuleInstructor" (
    "moduleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "moduleInstructorRole" "ModuleInstructorRole" NOT NULL DEFAULT 'AUTHOR',

    CONSTRAINT "ModuleInstructor_pkey" PRIMARY KEY ("moduleId","userId")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_publicUId_key" ON "Course"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseTranslation_courseId_locale_key" ON "CourseTranslation"("courseId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "CourseTranslation_locale_slug_key" ON "CourseTranslation"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Module_publicUId_key" ON "Module"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_courseId_slug_key" ON "Module"("courseId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleTranslation_moduleId_locale_key" ON "ModuleTranslation"("moduleId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_publicUId_key" ON "Lesson"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_slug_key" ON "Lesson"("moduleId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "LessonTranslation_lessonId_locale_key" ON "LessonTranslation"("lessonId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Component_publicUId_key" ON "Component"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "ComponentTranslation_componentId_locale_key" ON "ComponentTranslation"("componentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_publicUId_key" ON "CourseCategory"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_slug_key" ON "CourseCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategoryTranslation_categoryId_locale_key" ON "CourseCategoryTranslation"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategoryTranslation_locale_slug_key" ON "CourseCategoryTranslation"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicUId_key" ON "User"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tel_key" ON "User"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_lessonId_key" ON "LessonProgress"("userId", "lessonId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTranslation" ADD CONSTRAINT "CourseTranslation_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTranslation" ADD CONSTRAINT "ModuleTranslation_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonTranslation" ADD CONSTRAINT "LessonTranslation_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentTranslation" ADD CONSTRAINT "ComponentTranslation_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCategoryTranslation" ADD CONSTRAINT "CourseCategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInstructor" ADD CONSTRAINT "CourseInstructor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInstructor" ADD CONSTRAINT "CourseInstructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleInstructor" ADD CONSTRAINT "ModuleInstructor_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleInstructor" ADD CONSTRAINT "ModuleInstructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
