import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductButton } from "./DeleteProductButton";

// Tipe data produk beserta relasi brand-nya
interface ProductWithBrand {
  id: string;
  name: string;
  price: number;
  stock: number;
  brandId: string;
  brand: { name: string };
}

interface Brand {
  id: string;
  name: string;
}

interface ProductTableProps {
  products: ProductWithBrand[];
  brands: Brand[];
}

export function ProductTable({ products, brands }: ProductTableProps) {
  // Format angka ke format mata uang Rupiah
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-75">Nama Produk</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Tampilkan pesan jika belum ada produk */}
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                Belum ada produk yang terdaftar.
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-900">
                  {p.name}
                </TableCell>
                {/* Badge nama brand */}
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {p.brand.name}
                  </span>
                </TableCell>
                {/* Stok merah jika kurang dari 5 */}
                <TableCell>
                  <span className={p.stock < 5 ? "text-red-600 font-bold" : ""}>
                    {p.stock} <span className="text-xs text-muted-foreground font-normal">unit</span>
                  </span>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatIDR(p.price)}
                </TableCell>
                {/* Tombol aksi edit dan hapus */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditProductModal product={p} brands={brands} />
                    <DeleteProductButton id={p.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}