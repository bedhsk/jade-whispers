"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1a3a3a] text-[#d1c5a5] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">JADE WHISPERS</h3>
            <p className="text-sm">
              Antigüedades con historias que cuestionan la realidad
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/coleccion"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Colección
                </Link>
              </li>
              <li>
                <Link
                  href="/historias"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Historias
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-devoluciones"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Política de devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@jadewhispers.com"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  info@jadewhispers.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+34123456789"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  +34 123 456 789
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Redes Sociales</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Instagram
                </a>
                <span>|</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Facebook
                </a>
                <span>|</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d98c53] transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-center">
          <p>
            © 2025 Jade Whispers | Todos los derechos reservados | No nos
            hacemos responsables de las apariciones espectrales
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
