import Link from "next/link";
import { getProducts, getBrands } from "@/services/product-service";
import { ProductTable } from "@/components/product/ProductTable";
import { AddProductModal } from "@/components/product/AddProductModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function ProductsPage() {
  // Fetch produk dan brand secara paralel di server
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div className="p-8 space-y-6">
     
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Link href="/" className="hover:text-foreground">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground">Products</span>
      </div>

      {/* Header halaman */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Kelola stok dan harga produk Anda.
          </p>
        </div>
        {/* Modal tambah produk baru */}
        <AddProductModal brands={brands} />
      </div>

      {/* Tabel daftar produk */}
      <ProductTable products={products} brands={brands} />

       {/* Tombol kembali ke Dashboard */}
    <Link href="/">
        <Button variant="ghost" className="gap-2">
          <ChevronLeft className="h-5 w-5" />
          Kembali
        </Button>
      </Link>

    </div>
  );
}

