import Link from "next/link";
import { getProducts, getBrands } from "@/services/product-service";
import { ProductTable } from "@/components/product/ProductTable";
import { AddProductModal } from "@/components/product/AddProductModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react"; // Import icon back

export default async function ProductsPage() {
  // Fetching data paralel di Server
  const [products, brands] = await Promise.all([
    getProducts(),
    getBrands(),
  ]);

  return (
    <div className="p-8 space-y-6">
       {/* Tombol Kembali ke Dashboard */}
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Kelola stok dan harga produk Anda.</p>
        </div>
        {/* Tombol Tambah dengan Modal */}
        <AddProductModal brands={brands} />
      </div>

      {/* Tabel Produk */}
      <ProductTable products={products} brands={brands} />
    </div>
  );
}