-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'RETURNED');

-- CreateEnum
CREATE TYPE "ReviewReturnReason" AS ENUM ('OFF_TOPIC', 'PRICE_OR_COMPETITORS', 'PROFANITY', 'PERSONAL_DATA', 'LINKS_OR_PROMO');

-- CreateEnum
CREATE TYPE "ReviewRejectReason" AS ENUM ('PROHIBITED_CONTENT', 'PLAGIARISM', 'MASS_POSTING', 'SUSPICIOUS_ACTIVITY', 'EDIT_LIMIT_EXCEEDED');

-- CreateEnum
CREATE TYPE "ReviewModerationAction" AS ENUM ('RETURNED', 'REJECTED', 'APPROVED');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "publicUId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "overallImpression" TEXT NOT NULL,
    "whatLiked" TEXT,
    "whatDisliked" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "editCounter" INTEGER NOT NULL DEFAULT 0,
    "editLimit" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewModeration" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "moderatorId" INTEGER NOT NULL,
    "comment" TEXT,
    "action" "ReviewModerationAction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnReasons" "ReviewReturnReason"[] DEFAULT ARRAY[]::"ReviewReturnReason"[],
    "rejectReasons" "ReviewRejectReason"[] DEFAULT ARRAY[]::"ReviewRejectReason"[],

    CONSTRAINT "ReviewModeration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_publicUId_key" ON "Review"("publicUId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_courseId_key" ON "Review"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewModeration" ADD CONSTRAINT "ReviewModeration_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewModeration" ADD CONSTRAINT "ReviewModeration_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
