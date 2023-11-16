-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDay" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogBook" (
    "serialNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fisheryAuthorityId" TEXT NOT NULL,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogBook_pkey" PRIMARY KEY ("serialNumber")
);

-- CreateTable
CREATE TABLE "FisheryAuthority" (
    "fisheryAuthorityId" TEXT NOT NULL,
    "fisheryAuthorityName" TEXT NOT NULL,
    "taxId" INTEGER NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "door" INTEGER NOT NULL,

    CONSTRAINT "FisheryAuthority_pkey" PRIMARY KEY ("fisheryAuthorityId")
);

-- CreateTable
CREATE TABLE "City" (
    "postalCode" INTEGER NOT NULL,
    "cityName" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("postalCode")
);

-- CreateTable
CREATE TABLE "IsFishing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IsFishing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catches" (
    "catchId" TEXT NOT NULL,
    "logBookId" TEXT NOT NULL,
    "waterAreaName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fishTypeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitTypeId" INTEGER NOT NULL,

    CONSTRAINT "Catches_pkey" PRIMARY KEY ("catchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "LogBook_userId_key" ON "LogBook"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FisheryAuthority_taxId_key" ON "FisheryAuthority"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "City_postalCode_key" ON "City"("postalCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogBook" ADD CONSTRAINT "LogBook_fisheryAuthorityId_fkey" FOREIGN KEY ("fisheryAuthorityId") REFERENCES "FisheryAuthority"("fisheryAuthorityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FisheryAuthority" ADD CONSTRAINT "FisheryAuthority_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "City"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsFishing" ADD CONSTRAINT "IsFishing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catches" ADD CONSTRAINT "Catches_logBookId_fkey" FOREIGN KEY ("logBookId") REFERENCES "LogBook"("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
