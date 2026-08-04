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

    const nailsCategory = await prisma.category.create({
      data: {
        slug: 'nails',
        name: 'Маникюр',
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
        {
          slug: 'manicure-basic',
          name: 'Маникюр без покрытия',
          price: 1500,
          categoryId: nailsCategory.id,
        },
        {
          slug: 'manicure-coating',
          name: 'Маникюр с покрытием',
          price: 2300,
          categoryId: nailsCategory.id,
        },
        {
          slug: 'brows-correction',
          name: 'Коррекция бровей',
          price: 900,
          categoryId: browsCategory.id,
        },
        {
          slug: 'brows-coloring',
          name: 'Окрашивание бровей',
          price: 1200,
          categoryId: browsCategory.id,
        },
        {
          slug: 'lashes-lamination',
          name: 'Ламинирование ресниц',
          price: 2500,
          categoryId: lashesCategory.id,
        },
        {
          slug: 'lashes-extension',
          name: 'Наращивание ресниц',
          price: 3500,
          categoryId: lashesCategory.id,
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

    console.log('Seed completed');
  } catch (e) {
    console.error('Seed error:', e);
    throw new Error(String(e));
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
