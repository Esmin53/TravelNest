-- CreateEnum
CREATE TYPE "propertyTypes" AS ENUM ('hotel', 'motel', 'house', 'appartment', 'cabin', 'campsite', 'other');

-- CreateEnum
CREATE TYPE "landscapeTypes" AS ENUM ('city', 'country', 'mountains', 'beach', 'forrest', 'desert', 'snowy', 'camping', 'tropical', 'island');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'IN_PROCESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "propertyType" "propertyTypes" NOT NULL,
    "landscapeType" "landscapeTypes" NOT NULL,
    "name" TEXT NOT NULL,
    "pets" BOOLEAN NOT NULL,
    "airConditioning" BOOLEAN NOT NULL,
    "kitchen" BOOLEAN NOT NULL,
    "washingMachine" BOOLEAN NOT NULL,
    "freeWiFi" BOOLEAN NOT NULL,
    "noSmoking" BOOLEAN NOT NULL,
    "heating" BOOLEAN NOT NULL,
    "hostId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "checkInDate" TEXT NOT NULL,
    "checkOutDate" TEXT NOT NULL,
    "nights" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "propertyId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
