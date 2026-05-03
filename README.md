# 📦 Product Manager Pro

Aplikasi web Full-stack yang memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data produk. 

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **UI Library:** Shadcn UI & Tailwind CSS
- **Validation:** Zod
- **Icons:** Lucide React

## 🏁 Cara Menjalankan

1. Clone repo & install dependensi:
```bash
git clone https://github.com/afadholi1/nextjs-product-management.git
cd nextjs-product-management
npm install
```

2. Buat file `.env` dan isi `DATABASE_URL` dengan koneksi PostgreSQL (Neon).

3. Sinkronisasi database & jalankan:
```bash
npx prisma db push
npx prisma db seed
npm run dev
```