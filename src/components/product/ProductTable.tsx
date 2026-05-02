import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductWithBrand {
  id: string;
  name: string;
  price: number;
  stock: number;
  brand: { name: string };
}

export function ProductTable({ products }: { products: ProductWithBrand[] }) {
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead className="text-right">Harga</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                Belum ada produk. Silakan tambah produk baru.
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.brand.name}</TableCell>
                <TableCell>{p.stock} unit</TableCell>
                <TableCell className="text-right">{formatIDR(p.price)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}