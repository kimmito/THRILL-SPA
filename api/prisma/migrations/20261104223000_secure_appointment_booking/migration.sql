CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "appointments"
  ADD COLUMN IF NOT EXISTS "guest_email" TEXT,
  ADD COLUMN IF NOT EXISTS "guest_cancellation_token_hash" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "appointments_guest_cancellation_token_hash_key"
  ON "appointments"("guest_cancellation_token_hash");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'appointments_staff_active_time_no_overlap'
      AND conrelid = 'appointments'::regclass
  ) THEN
    ALTER TABLE "appointments"
      ADD CONSTRAINT "appointments_staff_active_time_no_overlap"
      EXCLUDE USING gist (
        "staff_id" WITH =,
        tsrange("start_at", "end_at", '[)') WITH &&
      )
      WHERE ("status" IN ('PENDING', 'CONFIRMED'));
  END IF;
END $$;
