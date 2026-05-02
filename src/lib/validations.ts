import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),

  price: z.coerce.number()
    .refine((v) => !Number.isNaN(v), "Harga harus berupa angka")
    .min(1000, "Harga minimal 1000"),

  stock: z.coerce.number()
    .refine((v) => !Number.isNaN(v), "Stok harus berupa angka")
    .min(0, "Stok tidak boleh negatif"),

  brandId: z.string().min(1, "Pilih Brand terlebih dahulu"),
});

// Infer type dari schema untuk digunakan di TypeScript
export type ProductInput = z.infer<typeof productSchema>;
