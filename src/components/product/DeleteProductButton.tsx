"use client";

import { deleteProductAction } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    
    setLoading(true);
    const res = await deleteProductAction(id);
    if (res.success) {
      toast.success("Produk dihapus");
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <Button 
      variant="destructive" 
      size="icon" 
      onClick={handleDelete} 
      disabled={loading}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}