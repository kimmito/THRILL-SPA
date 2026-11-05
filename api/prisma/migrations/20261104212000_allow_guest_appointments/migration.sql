ALTER TABLE "appointments"
  DROP CONSTRAINT "appointments_user_id_fkey";

ALTER TABLE "appointments"
  ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "appointments"
  ADD CONSTRAINT "appointments_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
