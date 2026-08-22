CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED');

CREATE TABLE "Appointment" (
  "id" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "service" TEXT NOT NULL,
  "preferredDate" DATE NOT NULL,
  "preferredTime" TEXT NOT NULL,
  "message" TEXT,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
  "confirmedDate" DATE,
  "confirmedTime" TEXT,
  "whatsappMessageId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Review" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "service" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "review" TEXT NOT NULL,
  "approved" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContactInquiry" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WhatsAppEvent" (
  "id" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WhatsAppEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Appointment_reference_key" ON "Appointment"("reference");
CREATE INDEX "Appointment_preferredDate_status_idx" ON "Appointment"("preferredDate", "status");
CREATE INDEX "Appointment_createdAt_idx" ON "Appointment"("createdAt");
CREATE INDEX "Review_approved_createdAt_idx" ON "Review"("approved", "createdAt");
