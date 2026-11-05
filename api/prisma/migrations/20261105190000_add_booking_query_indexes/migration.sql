CREATE INDEX IF NOT EXISTS "staff_services_service_id_idx"
  ON "staff_services"("service_id");

CREATE INDEX IF NOT EXISTS "staff_time_off_staff_time_range_idx"
  ON "staff_time_off"
  USING gist (
    "staff_id",
    tsrange("start_at", "end_at", '[)')
  );
