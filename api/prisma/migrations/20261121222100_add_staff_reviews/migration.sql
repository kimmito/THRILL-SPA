ALTER TABLE "reviews"
  ADD COLUMN "staff_id" INTEGER;

CREATE INDEX "reviews_staff_id_sort_order_idx"
  ON "reviews"("staff_id", "sort_order");

ALTER TABLE "reviews"
  ADD CONSTRAINT "reviews_staff_id_fkey"
  FOREIGN KEY ("staff_id")
  REFERENCES "staff"("id")
  ON DELETE SET NULL
  ON UPDATE CASCADE;
