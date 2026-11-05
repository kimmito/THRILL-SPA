UPDATE "services"
SET "price" = 1500, "duration_minutes" = 60
WHERE "slug" = 'manicure-basic';

UPDATE "services"
SET "price" = 2300, "duration_minutes" = 120
WHERE "slug" = 'manicure-coating';

UPDATE "services"
SET "price" = 1200, "duration_minutes" = 60
WHERE "slug" = 'manicure-men';

UPDATE "services"
SET "price" = 2500, "duration_minutes" = 150
WHERE "slug" = 'manicure-combined-coating';

UPDATE "services"
SET "price" = 3000, "duration_minutes" = 180
WHERE "slug" = 'manicure-extension';

UPDATE "services"
SET "name" = 'Дизайн простой', "price" = 500, "duration_minutes" = 30
WHERE "slug" = 'manicure-design-simple';

INSERT INTO "services" (
  "slug",
  "name",
  "price",
  "duration_minutes",
  "updated_at",
  "category_id"
)
SELECT
  'manicure-design-complex',
  'Дизайн сложный',
  900,
  60,
  CURRENT_TIMESTAMP,
  "id"
FROM "categories"
WHERE "slug" = 'nails'
ON CONFLICT ("slug") DO NOTHING;

UPDATE "services"
SET "price" = 700, "duration_minutes" = 30
WHERE "slug" = 'brows-correction';

UPDATE "services"
SET "price" = 1000, "duration_minutes" = 45
WHERE "slug" = 'brows-coloring';

UPDATE "services"
SET "price" = 1300, "duration_minutes" = 60
WHERE "slug" = 'brows-correction-coloring';

UPDATE "services"
SET "price" = 2000, "duration_minutes" = 90
WHERE "slug" = 'brows-lamination';

UPDATE "services"
SET "price" = 2700, "duration_minutes" = 120
WHERE "slug" = 'brows-complex';

UPDATE "services"
SET "price" = 500, "duration_minutes" = 30
WHERE "slug" = 'brows-face-depilation';

UPDATE "services"
SET "price" = 2000, "duration_minutes" = 120
WHERE "slug" = 'lashes-classic';

UPDATE "services"
SET "price" = 2300, "duration_minutes" = 150
WHERE "slug" = 'lashes-15d';

UPDATE "services"
SET "price" = 2600, "duration_minutes" = 150
WHERE "slug" = 'lashes-2d';

UPDATE "services"
SET "price" = 2900, "duration_minutes" = 180
WHERE "slug" = 'lashes-25d';

UPDATE "services"
SET "price" = 3300, "duration_minutes" = 180
WHERE "slug" = 'lashes-3d';

UPDATE "services"
SET "price" = 2000, "duration_minutes" = 90
WHERE "slug" = 'lashes-lamination';

UPDATE "services"
SET "price" = 1800, "duration_minutes" = 90
WHERE "slug" = 'pedicure-basic';

UPDATE "services"
SET "price" = 1500, "duration_minutes" = 60
WHERE "slug" = 'pedicure-feet-only';

UPDATE "services"
SET "price" = 2500, "duration_minutes" = 120
WHERE "slug" = 'pedicure-coating-no-feet';

UPDATE "services"
SET "price" = 3000, "duration_minutes" = 150
WHERE "slug" = 'pedicure-complex';
