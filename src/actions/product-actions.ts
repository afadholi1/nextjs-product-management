"use server";

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Action: Tambah produk baru
export async function createProductAction(data: unknown) {
  // Validasi input di sisi server sebelum menyentuh database
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.product.create({ data: result.data });
    revalidatePath("/products"); // Refresh cache halaman produk
    return { success: true };
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message: "Data dengan nilai yang sama sudah ada di database.",
        };
      }
    }

    return { success: false, message: "Terjadi kesalahan pada database." };
  }
}

// Action: Hapus produk berdasarkan ID
export async function deleteProductAction(id: string) {
  if (!id || typeof id !== "string") {
    return { success: false, message: "ID tidak valid." };
  }

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.log(error);

    // Produk tidak ditemukan
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return {
          success: false,
          message: "Produk tidak ditemukan atau sudah dihapus.",
        };
      }
    }

    return { success: false, message: "Gagal menghapus produk" };
  }
}

// Action: Update data produk berdasarkan ID
export async function updateProductAction(id: string, data: unknown) {
  // Validasi input sebelum update
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    await prisma.product.update({ where: { id }, data: result.data });
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.log(error);

    // Produk tidak ditemukan
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return {
          success: false,
          message: "Produk tidak ditemukan.",
        };
      }
    }

    return { success: false, message: "Gagal memperbarui produk" };
  }
}
