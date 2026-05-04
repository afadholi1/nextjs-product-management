"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductInput } from "@/lib/validations";
import { updateProductAction } from "@/actions/product-actions";
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
import { Pencil } from "lucide-react";

interface EditProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    brandId: string;
  };
  brands: { id: string; name: string }[];
}

export function EditProductModal({ product, brands }: EditProductProps) {
  const [open, setOpen] = useState(false);

  // React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      brandId: product.brandId,
    },
  });

  // Submit Handler
  const onSubmit = async (data: ProductInput) => {
    const res = await updateProductAction(product.id, data);

    if (res.success) {
      toast.success("Produk berhasil diperbarui!");
      setOpen(false);
    } else {
      toast.error(res.message || "Gagal memperbarui produk");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !isSubmitting && setOpen(v)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Nama Produk */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nama Produk</Label>
            <Input
              id="edit-name"
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
              <Label htmlFor="edit-price">Harga</Label>
              <Input
                id="edit-price"
                type="number"
                disabled={isSubmitting}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stok</Label>
              <Input
                id="edit-stock"
                type="number"
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
                    field.onBlur();
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan Perubahan..." : "Update Produk"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}