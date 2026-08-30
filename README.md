# WONA Bride

Інтернет-магазин весільних та вечірніх суконь (м. Бар, Вінницька область).

Сайт: [wona-bride.com.ua](https://wona-bride.com.ua)

## Технологічний стек

- **Next.js 16** (Turbopack) — App Router
- **React** + **TypeScript** (строга типізація)
- **MongoDB** — база даних
- **Zod** — валідація форм і даних
- **React Hook Form** — керування формами
- **TanStack Query** — робота із серверним станом
- **Zustand** — клієнтський стан (кошик, wishlist)
- **CSS Modules** — стилізація компонентів
- **Cloudinary** — зберігання та оптимізація зображень
- **Telegram Bot API** / **Nodemailer (mail.ts)** — сповіщення про нові записи/замовлення

## Структура проєкту

```
📦app          — сторінки та API-роути (App Router)
📦components   — UI-компоненти
📦lib
 ┣ 📂api         — клієнтські запити (categories, dresses, feedback, orders)
 ┣ 📂utils       — допоміжні функції (slug, dress helpers)
 ┣ 📂validation  — Zod-схеми (appointment, dress, feedback, order)
 ┣ 📜auth.ts
 ┣ 📜cloudinary.ts
 ┣ 📜mail.ts
 ┣ 📜mongodb.ts
 ┣ 📜schema.ts
 ┗ 📜telegram.ts
📦constants    — статичні дані (navigation тощо)
📦types        — TypeScript-типи (Dress, DressCategory тощо)
```

## Основний функціонал

### Публічна частина

- **Каталог суконь** — фільтрація за категоріями, пагінація, картки товару (`DressGrid`, `DressCard`, `DressFilters`, `DressCategories`)
- **Сторінка сукні** — галерея зображень, вибір розміру, довіра до бренду (`ProductDetails`, `DressGallery`, `SizeSelector`, `ProductTrust`)
- **Запис на примірку** — модальна форма (`AppointmentModal` → `AppointmentForm`), з валідацією через Zod, надсилає дані на `/api/appointment`; підтримує запис як із конкретної сукні (з розміром), так і загальний запис через Hero-секцію (без прив'язки до сукні)
- **Кошик і Wishlist** — на Zustand-сторах (`cartStore`, `wishlistStore`)
- **Відгуки** — перегляд і залишення відгуку (`Feedback`, `FeedbackForm`, `FeedbackSwiper`)
- **FAQ**, **Про нас**, **Контакти з картою** (`Faq`, `About`, `Contacts` + `Map`)
- **Пошук** по каталогу (`SearchBar`)

### Адмін-панель

- Керування сукнями: створення/редагування/видалення (`DressForm`, `DeleteDressButton`, `ImageUploader`)
- Модерація відгуків (`FeedbackAdminList`, `FeedbackEditForm`, `FeedbackActions`)
- Статуси замовлень і записів (`OrderStatus`, `AppointmentStatus`)
- Сповіщення адміну (`AdminNotificationsProvider`)
- Авторизація (`lib/auth.ts`, `AdminLogout`)

## Розробка

```bash
npm install
npm run dev     # локальний запуск
npm run build   # прод-збірка + перевірка типів
```

Змінні середовища задаються у `.env.local` (MongoDB URI, Cloudinary, Telegram Bot Token тощо).
