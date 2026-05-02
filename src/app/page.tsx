import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Tag, Wallet, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  // Ambil data agregat: jumlah produk, brand, dan total stok
  const [productCount, brandCount, totalStock] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.product.aggregate({ _sum: { stock: true } }),
  ]);

  // Konfigurasi kartu statistik
  const stats = [
    {
      title: "Total Produk",
      value: productCount,
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Brand",
      value: brandCount,
      icon: <Tag className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Stok",
      value: totalStock._sum.stock || 0, // fallback 0 jika null
      icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* Shortcut ke halaman Products */}
      <Link href="/products">
        <Button variant="outline" className="gap-2 mb-3">
          Lihat Produk <ArrowRight className="h-4 w-4 " />
        </Button>
      </Link>

      {/* Grid kartu statistik */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}