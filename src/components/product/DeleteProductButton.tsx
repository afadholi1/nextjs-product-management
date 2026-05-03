"use client";

import { deleteProductAction } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // Konfirmasi sebelum menghapus
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      setLoading(true);
      const res = await deleteProductAction(id);

      if (res.success) {
        toast.success("Produk berhasil dihapus");
      } else {
        toast.error(res.message || "Gagal menghapus produk");
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Tombol hapus dengan state loading
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={loading}
    >
        {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
