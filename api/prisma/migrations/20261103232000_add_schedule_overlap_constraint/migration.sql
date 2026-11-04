CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "staff_schedules"
  ADD CONSTRAINT "staff_schedules_day_of_week_check"
  CHECK ("day_of_week" BETWEEN 0 AND 6),
  ADD CONSTRAINT "staff_schedules_time_range_check"
  CHECK (
    "start_minute" >= 0
    AND "start_minute" < 1440
    AND "end_minute" > 0
    AND "end_minute" <= 1440
    AND "start_minute" < "end_minute"
  );

ALTER TABLE "staff_schedules"
  ADD CONSTRAINT "staff_schedules_no_overlap"
  EXCLUDE USING gist (
    "staff_id" WITH =,
    "day_of_week" WITH =,
    int4range("start_minute", "end_minute", '[)') WITH &&
  );
