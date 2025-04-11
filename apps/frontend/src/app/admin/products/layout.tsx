"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Admin */}
      <header className="bg-[#1a3a3a] text-[#d1c5a5] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            JADE WHISPERS
          </Link>
          <div className="text-sm">Panel de Administración</div>
        </div>
      </header>

      {/* Navegación Admin */}
      <nav className="bg-[#254040] text-white py-2 shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/admin"
                className={`py-2 px-1 inline-block ${pathname === "/admin" ? "border-b-2 border-[#d98c53]" : "hover:text-[#d1c5a5]"}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className={`py-2 px-1 inline-block ${pathname.includes("/admin/products") ? "border-b-2 border-[#d98c53]" : "hover:text-[#d1c5a5]"}`}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className={`py-2 px-1 inline-block ${pathname.includes("/admin/orders") ? "border-b-2 border-[#d98c53]" : "hover:text-[#d1c5a5]"}`}
              >
                Pedidos
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`py-2 px-1 inline-block ${pathname.includes("/admin/users") ? "border-b-2 border-[#d98c53]" : "hover:text-[#d1c5a5]"}`}
              >
                Usuarios
              </Link>
            </li>
            <li>
              <Link
                href="/admin/supernatural"
                className={`py-2 px-1 inline-block ${pathname.includes("/admin/supernatural") ? "border-b-2 border-[#d98c53]" : "hover:text-[#d1c5a5]"}`}
              >
                Efectos Sobrenaturales
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow">{children}</main>

      {/* Footer Admin */}
      <footer className="bg-[#1a3a3a] text-[#d1c5a5] py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Jade Whispers - Panel de
          Administración
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
