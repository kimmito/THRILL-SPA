import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting DB seed..');
  try {
    await prisma.offerItem.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.review.deleteMany();
    await prisma.service.deleteMany();
    await prisma.category.deleteMany();
    await prisma.shopItem.deleteMany();
    await prisma.shopCategory.deleteMany();

    const nailsCategory = await prisma.category.create({
      data: {
        slug: 'nails',
        name: 'Маникюр',
      },
    });

    const pedicureCategory = await prisma.category.create({
      data: {
        slug: 'pedicure',
        name: 'Педикюр',
      },
    });

    const browsCategory = await prisma.category.create({
      data: {
        slug: 'brows',
        name: 'Брови',
      },
    });

    const lashesCategory = await prisma.category.create({
      data: {
        slug: 'lashes',
        name: 'Ресницы',
      },
    });

    await prisma.service.createMany({
      data: [
        // Маникюр
        {
          slug: 'manicure-basic',
          name: 'Маникюр без покрытия',
          price: '1500',
          categoryId: nailsCategory.id,
        },
        {
          slug: 'manicure-coating',
          name: 'Маникюр с покрытием',
          price: '2300',
          categoryId: nailsCategory.id,
        },
        {
          slug: 'manicure-men',
          name: 'Мужской маникюр',
          price: '1200',
          categoryId: nailsCategory.id,
        },
        {
          slug: 'manicure-combined-coating',
          name: 'Комбинированный маникюр с покрытием однотон',
          price: '2500',
          categoryId: nailsCategory.id,
        },
        {
          slug: 'manicure-extension',
          name: 'Наращивание длины/сложная коррекция',
          price: '3000',
          categoryId: nailsCategory.id,
        },
        {
          slug: 'manicure-design-simple',
          name: 'Дизайн простой/сложный',
          price: '+500/+900',
          categoryId: nailsCategory.id,
        },
        // Брови
        {
          slug: 'brows-correction',
          name: 'Коррекция бровей',
          price: '700',
          categoryId: browsCategory.id,
        },
        {
          slug: 'brows-coloring',
          name: 'Окрашивание бровей',
          price: '1000',
          categoryId: browsCategory.id,
        },
        {
          slug: 'brows-correction-coloring',
          name: 'Коррекция + окрашивание',
          price: '1300',
          categoryId: browsCategory.id,
        },
        {
          slug: 'brows-lamination',
          name: 'Долговременная укладка',
          price: '2000',
          categoryId: browsCategory.id,
        },
        {
          slug: 'brows-complex',
          name: 'Комплекс (окрашивание + долговременная укладка)',
          price: '2700',
          categoryId: browsCategory.id,
        },
        {
          slug: 'brows-face-depilation',
          name: 'Депиляция зоны лица',
          price: '500',
          categoryId: browsCategory.id,
        },
        // Ресницы
        {
          slug: 'lashes-classic',
          name: 'Классика',
          price: '2000',
          categoryId: lashesCategory.id,
        },
        {
          slug: 'lashes-15d',
          name: '1.5D',
          price: '2300',
          categoryId: lashesCategory.id,
        },
        {
          slug: 'lashes-2d',
          name: '2D',
          price: '2600',
          categoryId: lashesCategory.id,
        },
        {
          slug: 'lashes-25d',
          name: '2.5D',
          price: '2900',
          categoryId: lashesCategory.id,
        },
        {
          slug: 'lashes-3d',
          name: '3D',
          price: '3300',
          categoryId: lashesCategory.id,
        },
        {
          slug: 'lashes-lamination',
          name: 'Ламинирование ресниц',
          price: '2000',
          categoryId: lashesCategory.id,
        },
        // Педикюр
        {
          slug: 'pedicure-basic',
          name: 'Педикюр без покрытия',
          price: '1800',
          categoryId: pedicureCategory.id,
        },
        {
          slug: 'pedicure-feet-only',
          name: 'Педикюр только стопы/пальцы',
          price: '1500',
          categoryId: pedicureCategory.id,
        },
        {
          slug: 'pedicure-coating-no-feet',
          name: 'Педикюр с покрытием без стопы',
          price: '2500',
          categoryId: pedicureCategory.id,
        },
        {
          slug: 'pedicure-complex',
          name: 'Педикюр комплекс',
          price: '3000',
          categoryId: pedicureCategory.id,
        },
      ],
    });

    await prisma.review.createMany({
      data: [
        {
          imagePath: null,
          date: new Date('2026-04-13T00:00:00.000Z'),
          stars: 5,
          author: 'Иван Иванов',
          text: 'Отличный сервис! Очень доволен результатом. Рекомендую всем!',
        },
        {
          imagePath: null,
          date: new Date('2026-04-22T00:00:00.000Z'),
          stars: 5,
          author: 'Мария Петрова',
          text: 'Отличный сервис! Очень доволен результатом. Рекомендую всем!',
        },
        {
          imagePath: null,
          date: new Date('2026-04-28T00:00:00.000Z'),
          stars: 5,
          author: 'Алексей Смирнов',
          text: 'Отличный сервис! Очень доволен результатом. Рекомендую всем!',
        },
        {
          imagePath: null,
          date: new Date('2026-05-03T00:00:00.000Z'),
          stars: 5,
          author: 'Елена Кузнецова',
          text: 'Отличный сервис! Очень доволен результатом. Рекомендую всем!',
        },
      ],
    });


    await prisma.staff.createMany({
      data: [
        {
          name: 'Анна Петрова',
          role: 'Мастер маникюра',
          photoPath: '/src/assets/images/team/master-01.png',
        },
        {
          name: 'Светлана Иванова',
          role: 'Мастер педикюра',
          photoPath: '/src/assets/images/team/master-02.png',
        },
        {
          name: 'Екатерина Смирнова',
          role: 'Мастер наращивания ногтей',
          photoPath: '/src/assets/images/team/master-03.png',
        },
        {
          name: 'Мария Кузнецова',
          role: 'Мастер дизайна ногтей',
          photoPath: '/src/assets/images/team/master-04.png',
        },
      ],
    });


    await prisma.portfolio.createMany({
      data: [
        { section: 'NAILS', imagePath: '/src/assets/images/portfolio/portfolio-manicure-01.png' },
        { section: 'NAILS', imagePath: '/src/assets/images/portfolio/portfolio-manicure-02.png' },
        { section: 'NAILS', imagePath: '/src/assets/images/portfolio/portfolio-manicure-03.png' },
        { section: 'NAILS', imagePath: '/src/assets/images/portfolio/portfolio-manicure-04.png' },
        { section: 'BROWS', imagePath: '/src/assets/images/portfolio/portfolio-brows-01.png' },
        { section: 'BROWS', imagePath: '/src/assets/images/portfolio/portfolio-brows-02.png' },
        { section: 'BROWS', imagePath: '/src/assets/images/portfolio/portfolio-lashes-01.png' },
        { section: 'BROWS', imagePath: '/src/assets/images/portfolio/portfolio-lashes-02.png' },
        { section: 'LASHES', imagePath: '/src/assets/images/portfolio/portfolio-lashers-03.png' },
        { section: 'LASHES', imagePath: '/src/assets/images/portfolio/portfolio-lashers-04.png' },
        { section: 'LASHES', imagePath: '/src/assets/images/portfolio/portfolio-lashes-01.png' },
        { section: 'LASHES', imagePath: '/src/assets/images/portfolio/portfolio-lashes-02.png' },
      ],
    });

    await prisma.offer.create({
      data: {
        title: 'Скидки на повторные посещения',
        slug: 'repeat-visits',
        description1: null,
        description2: null,
        offerItems: {
          create: [
            {
              title: '1 посещение',
              value: 'Активация',
              sortOrder: 1,
            },
            {
              title: '2 посещение',
              value: '-800 ₽',
              sortOrder: 2,
            },
            {
              title: '3 посещение',
              value: '-500 ₽',
              sortOrder: 3,
            },
          ],
        },
      },
    });

    await prisma.offer.create({
      data: {
        title: 'Подарочные сертификаты',
        slug: 'certificates',
        description1:
          'Электронный сертификат - универсальный подарок для близких, который не будет пылиться на полке.',
        description2: 'Действует на все услуги и товары. Отображается в личном кабинете.',
        offerItems: {
          create: [
            {
              title: 'Сертификат 1',
              value: '3 000 руб.',
              sortOrder: 1,
            },
            {
              title: 'Сертификат 2',
              value: '5 000 руб.',
              sortOrder: 2,
            },
          ],
        },
      },
    });

    const faceCategory = await prisma.shopCategory.create({
      data: { name: 'Лицо', slug: 'face' },
    });

    const handsCategory = await prisma.shopCategory.create({
      data: { name: 'Руки', slug: 'hands' },
    });

    const legsCategory = await prisma.shopCategory.create({
      data: { name: 'Ноги', slug: 'legs' },
    });

    const setsCategory = await prisma.shopCategory.create({
      data: { name: 'Наборы', slug: 'sets' },
    });


    await prisma.shopItem.createMany({
      data: [
        // Лицо
        {
          name: 'Увлажняющий крем для лица',
          slug: 'face-moisturizing-cream',
          price: 1500,
          shopCategoryId: faceCategory.id,
        },
        {
          name: 'Маска для лица увлажняющая',
          slug: 'face-moisturizing-mask',
          price: 1200,
          shopCategoryId: faceCategory.id,
        },
        {
          name: 'Маска для лица питательная',
          slug: 'face-nourishing-mask',
          price: 1300,
          shopCategoryId: faceCategory.id,
        },
        // Руки
        {
          name: 'Увлажняющий крем для рук',
          slug: 'hand-moisturizing-cream',
          price: 800,
          shopCategoryId: handsCategory.id,
        },
        {
          name: 'Маска для рук восстанавливающая',
          slug: 'hand-restoring-mask',
          price: 900,
          shopCategoryId: handsCategory.id,
        },
        {
          name: 'Масло для кутикулы',
          slug: 'cuticle-oil',
          price: 600,
          shopCategoryId: handsCategory.id,
        },
        {
          name: 'Бесцветный лак для укрепления ногтей',
          slug: 'nail-strengthening-polish',
          price: 750,
          shopCategoryId: handsCategory.id,
        },
        {
          name: 'Бесцветный лак для роста ногтей',
          slug: 'nail-growth-polish',
          price: 750,
          shopCategoryId: handsCategory.id,
        },
        // Ноги
        {
          name: 'Увлажняющий крем для ног',
          slug: 'foot-moisturizing-cream',
          price: 900,
          shopCategoryId: legsCategory.id,
        },
        {
          name: 'Маска для ног питательная',
          slug: 'foot-nourishing-mask',
          price: 1000,
          shopCategoryId: legsCategory.id,
        },
        {
          name: 'Парафин для парафинотерапии',
          slug: 'paraffin-therapy',
          price: 850,
          shopCategoryId: legsCategory.id,
        },
        {
          name: 'Средство от трещин на пятках',
          slug: 'cracked-heels-remedy',
          price: 700,
          shopCategoryId: legsCategory.id,
        },
        // Наборы
        {
          name: 'Набор "Уход за руками" (крем + масло + лак)',
          slug: 'hand-care-set',
          price: 2000,
          shopCategoryId: setsCategory.id,
        },
        {
          name: 'Набор "Уход за ногами" (крем + маска + парафин)',
          slug: 'foot-care-set',
          price: 2500,
          shopCategoryId: setsCategory.id,
        },
        {
          name: 'Подарочный набор "Все для ухода"',
          slug: 'gift-set-all-care',
          price: 3500,
          shopCategoryId: setsCategory.id,
        },
      ],
    });

    console.log('Seed completed');
  } catch (e) {
    console.error('Seed error:', e);
    throw e;
  }
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
