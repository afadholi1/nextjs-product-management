import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Tag, Wallet, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const [productCount, brandCount, totalStock] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.product.aggregate({ _sum: { stock: true } }),
  ]);

  const stockValue = totalStock._sum.stock ?? 0;

  const stats = [
    {
      title: "Total Produk",
      value: productCount,
      Icon: Package,
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      iconBg: "bg-indigo-500",
    },
    {
      title: "Total Brand",
      value: brandCount,
      Icon: Tag,
      gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
      iconBg: "bg-emerald-500",
    },
    {
      title: "Total Stok",
      value: stockValue,
      Icon: Wallet,
      gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
      iconBg: "bg-orange-500",
    },
  ];

  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview data produk & inventory
          </p>
        </div>

        <Link href="/products">
          <Button className="gap-2">
            Lihat Produk <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={`
              relative overflow-hidden border-0 shadow-md
              bg-linear-to-br ${stat.gradient}
              backdrop-blur-xl
              hover:shadow-xl transition-all duration-300
            `}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>

              <div
                className={`p-2 rounded-xl ${stat.iconBg} text-white shadow-md`}
              >
                <stat.Icon className="h-4 w-4" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Updated automatically
              </p>
            </CardContent>

            {/* decorative glow */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-30 bg-white" />
          </Card>
        ))}
      </div>
    </div>
  );
}