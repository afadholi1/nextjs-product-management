import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      brand: true, // Relasi: Mengambil data brand sekalian (Eager Loading)
    },
    orderBy: {
      createdAt: "desc", // Produk terbaru di atas
    },
  });
} 

export async function getBrands() {
  return await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });
}