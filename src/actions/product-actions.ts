"use server";

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createProductAction(data: unknown) {
  // 1. Validasi ulang di server (Keamanan No. 1)
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Simpan ke database
    await prisma.product.create({
      data: result.data,
    });

    // 3. Revalidasi path agar halaman list product terupdate
    revalidatePath("/products");
    
    return { success: true };
  } catch (error) {
    console.log(error);
    return { 
      success: false, 
      message: "Terjadi kesalahan pada database." 
    };
  }
}