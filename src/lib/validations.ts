import { z } from "zod";

// Skema validasi form produk menggunakan Zod
export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  price: z.coerce.number().min(1000, "Harga produk minimal 1 ribu rupiah"), // coerce: otomatis konversi string → number
  stock: z.coerce.number().min(1, "Stok produk minimal 1 unit"),
  brandId: z.string().min(1, "Pilih brand terlebih dahulu"),
});

// Infer type dari schema untuk digunakan di TypeScript
export type ProductInput = z.infer<typeof productSchema>;