# WONA Bride

Commercial full-stack e-commerce website for a real bridal salon, offering wedding and evening dresses in Bar, Vinnytsia region, Ukraine.

**Live Demo:** [wona-bride.com.ua](https://wona-bride.com.ua)
**Repository:** [github.com/wona-bride/wona-bride](https://github.com/Andrii-Mitko/wona_bride)

---

## Overview

WONA Bride is a full-stack online store built for a real business, covering the complete customer journey — from browsing the dress catalog to booking a fitting appointment — along with a full admin panel for managing products, orders, and customer feedback.

## Tech Stack

**Frontend**

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict typing)
- CSS Modules
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form handling and validation
- [Zustand](https://zustand-demo.pmnd.rs/) — client-side state (cart, wishlist)
- [TanStack Query](https://tanstack.com/query) — server-state management

**Backend**

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/) — image storage and optimization
- [Telegram Bot API](https://core.telegram.org/bots/api) / Nodemailer — real-time order and appointment notifications

## Features

### Customer-facing

- Product catalog with category filters, pagination, and a responsive grid layout
- Dress detail pages with image gallery, size selection, and trust signals
- Appointment booking — schedule a fitting for a specific dress or a general inquiry, via a modal form with real-time validation
- Shopping cart and wishlist, persisted client-side
- Customer reviews with a submission form
- FAQ, About, and Contacts (with an interactive map)
- Search across the catalog

### Admin panel

- Full CRUD for dresses, with image uploads (Cloudinary)
- Feedback moderation (approve / edit / delete)
- Order and appointment status management
- Real-time notifications for new orders and appointments
- Authenticated admin access

## Project Structure

```
├── app/            # Next.js App Router — pages & API routes
├── components/     # UI components (catalog, forms, admin, layout)
├── lib/
│   ├── api/           # Client-side data fetching
│   ├── utils/         # Helper functions
│   ├── validation/    # Zod schemas
│   ├── auth.ts
│   ├── cloudinary.ts
│   ├── mail.ts
│   ├── mongodb.ts
│   └── telegram.ts
├── constants/      # Static app data (navigation, etc.)
└── types/          # Shared TypeScript types
```

## Getting Started

```bash
# install dependencies
npm install

# run the development server
npm run dev

# create a production build (includes type checking)
npm run build
```

Environment variables (MongoDB URI, Cloudinary credentials, Telegram bot token, etc.) are configured in `.env.local`.

## Author

**Andrii Mitko** — Full Stack JavaScript Developer

Building modern, scalable, and user-friendly web applications with React, Next.js, TypeScript, Node.js, and MongoDB.

- Portfolio: [andrii-mitko-brand.vercel.app](https://andrii-mitko-brand.vercel.app/)
- GitHub: [@Andrii-Mitko](https://github.com/Andrii-Mitko)
- LinkedIn: [andrii-mitko](https://www.linkedin.com/in/andrii-mitko/)
- Email: [andreymit123@gmail.com](mailto:andreymit123@gmail.com)

---

© 2026 WONA Bride. All rights reserved.
