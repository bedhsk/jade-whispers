"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewProductDefaultPage() {
  const router = useRouter();

  // Redirigir a la primera pestaña (información básica)
  useEffect(() => {
    router.replace("/admin/products/new/basic-info");
  }, [router]);

  // Mostrar spinner durante la redirección
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d98c53]"></div>
    </div>
  );
}
