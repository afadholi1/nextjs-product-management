import { PrismaClient } from "@prisma/client";

// Simpan instance Prisma di global object untuk menghindari koneksi berlebih saat hot reload (dev mode)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Tampilkan query SQL di terminal saat development
  });

// Hanya simpan ke global di luar production
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;