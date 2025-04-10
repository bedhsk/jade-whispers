"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#1a3a3a] text-[#d1c5a5] py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-semibold">
            <Link href="/" className="hover:text-[#d98c53] transition-colors">
              JADE WHISPERS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-[#d98c53] transition-colors">
              INICIO
            </Link>
            <Link
              href="/coleccion"
              className="hover:text-[#d98c53] transition-colors"
            >
              COLECCIÓN
            </Link>
            <Link
              href="/historias"
              className="hover:text-[#d98c53] transition-colors"
            >
              HISTORIAS
            </Link>
            <Link
              href="/sobre-nosotros"
              className="hover:text-[#d98c53] transition-colors"
            >
              SOBRE NOSOTROS
            </Link>
          </nav>

          {/* User Icons */}
          <div className="flex items-center space-x-4">
            <button
              aria-label="Buscar"
              className="text-[#d1c5a5] hover:text-[#d98c53] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/auth/login"
              aria-label="Mi Cuenta"
              className="text-[#d1c5a5] hover:text-[#d98c53] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link
              href="/carrito"
              className="relative text-[#d1c5a5] hover:text-[#d98c53] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#d98c53] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#d1c5a5] hover:text-[#d98c53] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-[#d98c53] transition-colors">
                INICIO
              </Link>
              <Link
                href="/coleccion"
                className="hover:text-[#d98c53] transition-colors"
              >
                COLECCIÓN
              </Link>
              <Link
                href="/historias"
                className="hover:text-[#d98c53] transition-colors"
              >
                HISTORIAS
              </Link>
              <Link
                href="/sobre-nosotros"
                className="hover:text-[#d98c53] transition-colors"
              >
                SOBRE NOSOTROS
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
