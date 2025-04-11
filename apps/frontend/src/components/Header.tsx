"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);

      // Si está autenticado, obtener y mostrar su nombre
      if (isAuth) {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            setUserName(userData.name || userData.email || "Usuario");
          } catch (error) {
            setUserName("Usuario");
          }
        }
      }
    };

    checkAuth();

    // Agregar un event listener para detectar cambios en localStorage (login/logout)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    setUserName("");

    // Disparar un evento de storage para actualizar otros componentes
    window.dispatchEvent(new Event("storage"));

    // Redireccionar a la página principal
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

            {/* Icono de usuario con menú desplegable si está autenticado */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="Mi Cuenta"
                    className="text-[#d1c5a5] hover:text-[#d98c53] transition-colors flex items-center"
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
                    <span className="ml-2 hidden sm:inline">{userName}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isUserMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  </button>

                  {/* Menú desplegable para usuario autenticado */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        Hola, <span className="font-medium">{userName}</span>
                      </div>
                      <Link
                        href="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        href="/pedidos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mis Pedidos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </>
              ) : (
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
              )}
            </div>

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

              {/* Opciones de usuario en menú móvil */}
              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <p className="text-sm opacity-75">Hola, {userName}</p>
                  </div>
                  <Link
                    href="/perfil"
                    className="hover:text-[#d98c53] transition-colors pl-2 text-sm"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    href="/pedidos"
                    className="hover:text-[#d98c53] transition-colors pl-2 text-sm"
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-[#d98c53] transition-colors pl-2 text-sm"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Overlay para cerrar el menú de usuario cuando se hace clic fuera */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
