import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Menghapus data lama...");
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();

  console.log("🏷️ Membuat data brand...");
  const apple = await prisma.brand.create({
    data: { name: "Apple" },
  });
  const samsung = await prisma.brand.create({
    data: { name: "Samsung" },
  });
  const sony = await prisma.brand.create({
    data: { name: "Sony" },
  });

  console.log("📦 Membuat produk awal...");
  await prisma.product.createMany({
    data: [
      { name: "iPhone 15 Pro", price: 20000000, stock: 10, brandId: apple.id },
      {
        name: "Galaxy S24 Ultra",
        price: 18000000,
        stock: 8,
        brandId: samsung.id,
      },
      { name: "Sony WH-1000XM5", price: 5000000, stock: 15, brandId: sony.id },
    ],
  });

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
