"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Loader2 } from "lucide-react";

export function AddProductModal({
  brands,
}: {
  brands: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  // React Hook Form
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: undefined,
      stock: undefined,
      brandId: "",
    },
  });

  // Submit Handler
  const onSubmit = async (data: ProductInput) => {
    try {
      const res = await createProductAction(data);

      if (res.success) {
        toast.success("Produk berhasil ditambahkan!");

        reset(); // reset seluruh field termasuk Select
        setOpen(false); // tutup modal
      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, msgs]) => {
            setError(field as keyof ProductInput, {
              message: msgs[0],
            });
            toast.error(msgs[0]);
          });
        } else {
          toast.error(res.message || "Gagal menambahkan produk");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Terjadi kesalahan server");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !isSubmitting && setOpen(v)}>
      <DialogTrigger asChild>
        <Button>+ Tambah Produk</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Nama Produk */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input
              id="name"
              placeholder="Contoh: iPhone 15"
              disabled={isSubmitting}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga</Label>
              <Input
                id="price"
                type="number"
                placeholder="15000000"
                disabled={isSubmitting}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stok</Label>
              <Input
                id="stock"
                type="number"
                placeholder="10"
                disabled={isSubmitting}
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-xs text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <Label>Brand</Label>

            <Controller
              name="brandId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                    field.onBlur(); // ini penting
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={errors.brandId ? "border-red-500" : ""}
                  >
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
              )}
            />

            {errors.brandId && (
              <p className="text-xs text-red-500">{errors.brandId.message}</p>
            )}
          </div>

          {/* Button Submit */}
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
