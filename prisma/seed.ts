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
  const xiaomi = await prisma.brand.create({
    data: { name: "Xiaomi" },
  });
  const oppo = await prisma.brand.create({
    data: { name: "Oppo" },
  });
  const vivo = await prisma.brand.create({
    data: { name: "Vivo" },
  });
  const realme = await prisma.brand.create({
    data: { name: "Realme" },
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
      { name: "Xiaomi 14", price: 8000000, stock: 20, brandId: xiaomi.id },
      { name: "Oppo Find X7", price: 9000000, stock: 12, brandId: oppo.id },
      { name: "Vivo V30 Pro", price: 7000000, stock: 18, brandId: vivo.id },
      { name: "Realme GT 6", price: 6000000, stock: 25, brandId: realme.id },
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



