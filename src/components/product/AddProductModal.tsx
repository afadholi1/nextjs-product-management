"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductInput } from "@/lib/validations";
import { createProductAction } from "@/actions/product-actions";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddProductModal({
  brands,
}: {
  brands: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  // Inisialisasi form dengan validasi Zod
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { brandId: "" },
  });

  // Submit: kirim data ke server action, tampilkan toast, tutup modal
  const onSubmit = async (data: ProductInput) => {
    const res = await createProductAction(data);
    if (res.success) {
      toast.success("Produk berhasil ditambahkan!");
      reset();
      setOpen(false);
    } else {
      toast.error(res.message || "Gagal menambahkan produk");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Tambah Produk</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Field nama produk */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Contoh: iPhone 15"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Field harga dan stok dalam dua kolom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga</Label>
              <Input id="price" type="number" {...register("price")} />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stok</Label>
              <Input id="stock" type="number" {...register("stock")} />
              {errors.stock && (
                <p className="text-xs text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* Dropdown pilih brand */}
          <div className="space-y-2">
            <Label>Brand</Label>
            <Select onValueChange={(value) => setValue("brandId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brandId && (
              <p className="text-xs text-red-500">{errors.brandId.message}</p>
            )}
          </div>

          {/* Tombol submit dengan state loading */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}