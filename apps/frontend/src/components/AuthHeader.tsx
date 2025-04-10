"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

const AuthHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Limpiar datos de autenticación
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    // Actualizar estado
    setIsLoggedIn(false);
    setUser(null);
    setUserMenuOpen(false);

    // Redireccionar a la página de inicio
    router.push("/");
  };

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

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center text-[#d1c5a5] hover:text-[#d98c53] transition-colors"
                >
                  <div className="w-8 h-8 bg-[#d98c53] rounded-full flex items-center justify-center text-white">
                    {user?.name.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mi perfil
                    </Link>
                    <Link
                      href="/pedidos"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mis pedidos
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                aria-label="Iniciar sesión"
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
            )}

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
              {isLoggedIn && (
                <>
                  <Link
                    href="/perfil"
                    className="hover:text-[#d98c53] transition-colors"
                  >
                    MI PERFIL
                  </Link>
                  <Link
                    href="/pedidos"
                    className="hover:text-[#d98c53] transition-colors"
                  >
                    MIS PEDIDOS
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-[#d98c53] transition-colors"
                  >
                    CERRAR SESIÓN
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
