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
import { formatIDR } from "@/lib/utils";

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

const brandColors: Record<string, string> = {
  Apple: "bg-gray-200 text-gray-800 ring-gray-400/50",
  Samsung: "bg-blue-100 text-blue-700 ring-blue-300/50",
  Sony: "bg-violet-100 text-violet-700 ring-violet-300/50",
  Xiaomi: "bg-orange-100 text-orange-700 ring-orange-300/50",
  Oppo: "bg-green-100 text-green-700 ring-green-300/50",
  Vivo: "bg-sky-100 text-sky-700 ring-sky-300/50",
};

export function ProductTable({ products, brands }: ProductTableProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-72 font-semibold">Nama Produk</TableHead>
            <TableHead className="font-semibold">Brand</TableHead>
            <TableHead className="font-semibold">Stok</TableHead>
            <TableHead className="font-semibold">Harga</TableHead>
            <TableHead className="text-right font-semibold">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-muted-foreground"
              >
                Belum ada produk yang terdaftar.
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow
                key={p.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium text-slate-900">
                  {p.name}
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                      brandColors[p.brand?.name] ??
                      "bg-gray-100 text-gray-700 ring-gray-300/50"
                    }`}
                  >
                    {p.brand?.name ?? "-"}
                  </span>
                </TableCell>

                <TableCell>
                  {p.stock < 5 ? (
                    <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                      {p.stock} unit
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-slate-700">
                      {p.stock} unit
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-sm font-semibold text-emerald-700">
                  {formatIDR(p.price)}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditProductModal
                      aria-label="Edit produk"
                      product={p}
                      brands={brands}
                    />
                    <DeleteProductButton aria-label="Hapus produk" id={p.id} />
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
