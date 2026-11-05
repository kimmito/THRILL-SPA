CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "business_closures"
  ADD CONSTRAINT "business_closures_no_overlap"
  EXCLUDE USING gist (
    tsrange("start_at", "end_at", '[)') WITH &&
  );
