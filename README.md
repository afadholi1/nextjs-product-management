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

1. **Clone repository:**
```bash
git clone https://github.com/afadholi1/nextjs-product-management.git
cd nama-repo
```

2. **Install dependensi:**
```bash
npm install
```

3. **Setup Environment Variables:**  
Buat file `.env` dan masukkan `DATABASE_URL` PostgreSQL (Neon) kamu.

4. **Sinkronisasi Database:**
```bash
npx prisma db push
npx prisma db seed
```

5. **Jalankan Aplikasi:**
```bash
npm run dev
```
