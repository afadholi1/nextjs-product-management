import { prisma } from "@/lib/prisma";

// Ambil semua produk beserta data brand-nya, diurutkan terbaru
export async function getProducts() {
  return await prisma.product.findMany({
    include: { brand: true }, // Eager loading relasi brand
    orderBy: { createdAt: "desc" },
  });
}

// Ambil semua brand diurutkan alfabetis
export async function getBrands() {
  return await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });
}