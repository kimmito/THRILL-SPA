# THRILL SPA

Fullstack-приложение для салона красоты: каталог услуг, мастера, отзывы и онлайн-запись.

## Стек

- Frontend: React, TypeScript, Vite, TailwindCSS
- Backend: NestJS, Prisma, PostgreSQL, Redis

## Запуск

### Backend

```bash
cd api
npm install
copy .env.example .env
npm run db:setup
npm run start:dev
```

### Frontend

В отдельном терминале:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Frontend будет доступен по адресу `http://localhost:5173`, API — по адресу `http://localhost:4000/api`.

Для запуска базы данных и Redis используется Docker Compose из каталога `api`.
