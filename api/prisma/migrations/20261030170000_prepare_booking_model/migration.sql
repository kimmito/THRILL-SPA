-- Normalize service pricing and add booking metadata.
ALTER TABLE "services"
  ADD COLUMN "duration_minutes" INTEGER NOT NULL DEFAULT 60,
  ADD COLUMN "is_bookable" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "services"
  ALTER COLUMN "price" TYPE INTEGER
  USING CASE
    WHEN "price" ~ '^[0-9]+$' THEN "price"::INTEGER
    WHEN "price" = '+500/+900' THEN 500
    ELSE 0
  END;

ALTER TABLE "services"
  ALTER COLUMN "duration_minutes" DROP DEFAULT,
  ALTER COLUMN "is_bookable" DROP DEFAULT,
  ALTER COLUMN "updated_at" DROP DEFAULT;

CREATE INDEX "services_category_id_is_active_is_bookable_idx"
  ON "services"("category_id", "is_active", "is_bookable");

CREATE TABLE "staff_schedules" (
  "id" SERIAL NOT NULL,
  "staff_id" INTEGER NOT NULL,
  "day_of_week" INTEGER NOT NULL,
  "start_minute" INTEGER NOT NULL,
  "end_minute" INTEGER NOT NULL,

  CONSTRAINT "staff_schedules_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "staff_schedules_staff_id_day_of_week_idx"
  ON "staff_schedules"("staff_id", "day_of_week");

CREATE TABLE "staff_breaks" (
  "id" SERIAL NOT NULL,
  "staff_id" INTEGER NOT NULL,
  "day_of_week" INTEGER NOT NULL,
  "start_minute" INTEGER NOT NULL,
  "end_minute" INTEGER NOT NULL,
  "title" TEXT,

  CONSTRAINT "staff_breaks_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "staff_breaks_staff_id_day_of_week_idx"
  ON "staff_breaks"("staff_id", "day_of_week");

CREATE TABLE "staff_time_off" (
  "id" SERIAL NOT NULL,
  "staff_id" INTEGER NOT NULL,
  "start_at" TIMESTAMP(3) NOT NULL,
  "end_at" TIMESTAMP(3) NOT NULL,
  "reason" TEXT,

  CONSTRAINT "staff_time_off_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "staff_time_off_staff_id_start_at_end_at_idx"
  ON "staff_time_off"("staff_id", "start_at", "end_at");

CREATE TABLE "staff_services" (
  "staff_id" INTEGER NOT NULL,
  "service_id" INTEGER NOT NULL,

  CONSTRAINT "staff_services_pkey" PRIMARY KEY ("staff_id", "service_id")
);

CREATE TABLE "business_closures" (
  "id" SERIAL NOT NULL,
  "start_at" TIMESTAMP(3) NOT NULL,
  "end_at" TIMESTAMP(3) NOT NULL,
  "reason" TEXT,

  CONSTRAINT "business_closures_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "business_closures_start_at_end_at_idx"
  ON "business_closures"("start_at", "end_at");

CREATE TYPE "AppointmentStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
  'NO_SHOW'
);

CREATE TABLE "appointments" (
  "id" SERIAL NOT NULL,
  "staff_id" INTEGER NOT NULL,
  "service_id" INTEGER NOT NULL,
  "user_id" TEXT NOT NULL,
  "start_at" TIMESTAMP(3) NOT NULL,
  "end_at" TIMESTAMP(3) NOT NULL,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'CONFIRMED',
  "comment" TEXT,
  "service_name_snapshot" TEXT NOT NULL,
  "staff_name_snapshot" TEXT NOT NULL,
  "price_snapshot" INTEGER NOT NULL,
  "duration_minutes_snapshot" INTEGER NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "appointments_user_id_start_at_idx"
  ON "appointments"("user_id", "start_at");

CREATE INDEX "appointments_staff_id_start_at_idx"
  ON "appointments"("staff_id", "start_at");

CREATE INDEX "appointments_status_start_at_idx"
  ON "appointments"("status", "start_at");

ALTER TABLE "staff_schedules"
  ADD CONSTRAINT "staff_schedules_staff_id_fkey"
  FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "staff_breaks"
  ADD CONSTRAINT "staff_breaks_staff_id_fkey"
  FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "staff_time_off"
  ADD CONSTRAINT "staff_time_off_staff_id_fkey"
  FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "staff_services"
  ADD CONSTRAINT "staff_services_staff_id_fkey"
  FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "staff_services_service_id_fkey"
  FOREIGN KEY ("service_id") REFERENCES "services"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "appointments"
  ADD CONSTRAINT "appointments_staff_id_fkey"
  FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "appointments_service_id_fkey"
  FOREIGN KEY ("service_id") REFERENCES "services"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "appointments_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
