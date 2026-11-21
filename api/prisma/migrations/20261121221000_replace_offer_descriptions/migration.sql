ALTER TABLE "offers" ADD COLUMN "description" JSONB;

UPDATE "offers"
SET "description" = (
  SELECT jsonb_agg("value")
  FROM (
    SELECT "description_1" AS "value"
    WHERE "description_1" IS NOT NULL

    UNION ALL

    SELECT "description_2" AS "value"
    WHERE "description_2" IS NOT NULL
  ) AS "descriptions"
);

ALTER TABLE "offers"
  DROP COLUMN "description_1",
  DROP COLUMN "description_2";
