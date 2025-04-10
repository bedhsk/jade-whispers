"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductPurchase from "@/components/product-detail/ProductPurchase";
import AntiCurseInsurance from "@/components/product-detail/AntiCurseInsurance";
import ProductTabs from "@/components/product-detail/ProductTabs";
import RelatedProducts from "@/components/product-detail/RelatedProducts";

// Datos de ejemplo para simular una BD
const PRODUCTS_DB = [
  {
    id: 1,
    name: "Jarrón Dinastía Ming",
    price: 1899,
    imageUrl: "/images/product-1.jpg",
    description: "Escucha susurros del pasado...",
    slug: "jarron-dinastia-ming",
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
    gallery: [
      { id: 1, url: "/images/product-1.jpg", alt: "Vista frontal" },
      { id: 2, url: "/images/product-1-2.jpg", alt: "Vista lateral" },
      { id: 3, url: "/images/product-1-3.jpg", alt: "Vista detalle" },
      { id: 4, url: "/images/product-1-4.jpg", alt: "Vista posterior" },
    ],
    supernaturalPowers:
      "Escucha susurros del pasado y reorganiza tu librería mientras duermes",
    paranormalActivityLevel: 80,
    details: {
      "Antigüedad certificada": "Dinastía Ming (1368-1644)",
      Material: "Porcelana",
      Dimensiones: "30cm x 20cm",
      Origen: "China",
      Estado: "Excelente, restauración mínima",
    },
    description:
      "Este extraordinario jarrón de la dinastía Ming no es solo una pieza de colección, sino que posee genuinas propiedades sobrenaturales. Elaborado con la porcelana más fina del período, ha absorbido siglos de historias, secretos y energías.\n\nLos propietarios anteriores han documentado ampliamente su capacidad para susurrar fragmentos de conversaciones ocurridas en su presencia siglos atrás. Particularmente activo durante las noches de luna llena, este jarrón también desarrolla una peculiar afición por el orden, reorganizando librerías y estanterías mientras sus dueños duermen.\n\nCada jarrón incluye un certificado oficial de autenticidad sobrenatural y un diario para documentar sus actividades paranormales.",
    history:
      'Fabricado durante el reinado del emperador Yongle, este jarrón formaba parte de la colección imperial en la Ciudad Prohibida. Durante la dinastía Qing, fue robado por un cortesano que lo sacó de contrabando a Europa. \n\nHa pasado por las manos de numerosos coleccionistas, todos los cuales han informado de la tendencia del jarrón a "susurrar" en chino antiguo durante las noches tranquilas. Su último propietario, un bibliotecario jubilado de Oxford, aseguró que el jarrón reorganizaba meticulosamente su extensa colección de libros mientras dormía.\n\nAhora, esta pieza excepcional puede ser tuya, junto con todas sus peculiaridades históricas y sobrenaturales.',
    care: "Para mantener a tu jarrón Ming feliz y sus poderes sobrenaturales funcionando correctamente:\n\n- Limpia suavemente con un paño suave y seco. Nunca sumerjas en agua.\n- Colócalo en un lugar con buena circulación de chi (energía).\n- Evita ubicarlo cerca de otros artefactos sobrenaturales para prevenir interferencias paranormales.\n- Si su actividad de reorganización se vuelve excesiva, coloca un libro de poesía clásica china cerca para calmarlo.\n- En las noches de luna llena, puedes dejar un pequeño cuaderno y lápiz cerca para que registre sus susurros.\n\nNota: Los objetos reorganizados siempre siguen un sistema lógico, aunque no siempre comprensible para la mente occidental.",
    reviews: [
      {
        id: 1,
        author: "Zhang Wei",
        date: "10 de febrero, 2025",
        rating: 5,
        content:
          "Una pieza hermosa que ha mejorado considerablemente la decoración de mi sala de estar. La calidad es excepcional y cada detalle es perfecto.",
        supernaturalExperience:
          "He notado que mi biblioteca está mucho más organizada por las mañanas. Al principio pensé que era mi esposa, pero ella juró que no había sido ella. ¡El jarrón ha reorganizado alfabéticamente toda mi colección de poesía!",
      },
      {
        id: 2,
        author: "María González",
        date: "28 de enero, 2025",
        rating: 4,
        content:
          "El jarrón llegó en perfectas condiciones y es aún más hermoso en persona. La antigüedad se nota en cada detalle.",
        supernaturalExperience:
          "En las noches silenciosas puedo escuchar susurros que suenan como un idioma antiguo. Mi gato se sienta frente al jarrón durante horas como si estuviera escuchando una fascinante historia.",
      },
    ],
  },
  {
    id: 2,
    name: "Figura de Jade Imperial",
    price: 2499,
    imageUrl: "/images/product-2.jpg",
    description: "Consejos financieros a las 3AM",
    slug: "figura-jade-imperial",
    category: {
      name: "Consejos Dudosos",
      slug: "consejos-dudosos",
    },
  },
  {
    id: 3,
    name: "Abanico de la Corte Qing",
    price: 1299,
    imageUrl: "/images/product-3.jpg",
    description: "Genera brisas y maldiciones leves",
    slug: "abanico-corte-qing",
    category: {
      name: "Maldiciones Leves",
      slug: "maldiciones-leves",
    },
  },
  {
    id: 4,
    name: "Tetera de Porcelana",
    price: 899,
    imageUrl: "/images/product-4.jpg",
    description: "Apariciones nocturnas garantizadas",
    slug: "tetera-porcelana",
    category: {
      name: "Fantasmas Amigables",
      slug: "fantasmas-amigables",
    },
  },
  {
    id: 5,
    name: "Espejo de Bronce Antiguo",
    price: 1699,
    imageUrl: "/images/product-5.jpg",
    description: "Refleja tus yos alternativos",
    slug: "espejo-bronce-antiguo",
    category: {
      name: "Maldiciones Leves",
      slug: "maldiciones-leves",
    },
  },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [withInsurance, setWithInsurance] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Simulando una carga de datos
    setLoading(true);

    // Encontrar el producto por slug
    const foundProduct = PRODUCTS_DB.find((p) => p.slug === slug);

    if (foundProduct) {
      setProduct(foundProduct);

      // Encontrar productos relacionados (de la misma categoría)
      const related = PRODUCTS_DB.filter(
        (p) =>
          p.category.slug === foundProduct.category.slug &&
          p.id !== foundProduct.id
      ).slice(0, 4); // Limitar a 4 productos

      setRelatedProducts(related);
    }

    setLoading(false);
  }, [slug]);

  const handleAddToCart = (quantity: number) => {
    const finalPrice = product.price * quantity + (withInsurance ? 99 : 0);

    // Aquí iría la lógica para añadir al carrito
    console.log(
      `Añadido al carrito: ${quantity} ${product.name} por ${finalPrice}`
    );
    alert(
      `Producto añadido al carrito: ${quantity} x ${product.name}\nPrecio total: ${finalPrice}`
    );
  };

  const handleToggleInsurance = (isSelected: boolean) => {
    setWithInsurance(isSelected);
  };

  // Generar breadcrumbs dinámicamente
  const breadcrumbItems = product
    ? [
        { label: "Inicio", href: "/" },
        { label: "Colección", href: "/coleccion" },
        {
          label: product.category.name,
          href: `/coleccion/${product.category.slug}`,
        },
        { label: product.name, href: `#`, isCurrent: true },
      ]
    : [];

  if (loading) {
    return (
      <>
        <Header />
        <main className="pb-12 pt-6">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="pb-12 pt-6">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold text-[#1a3a3a] mb-4">
              Producto no encontrado
            </h1>
            <p className="text-[#1a3a3a] mb-6">
              Lo sentimos, el producto que estás buscando no existe o ha sido
              retirado.
            </p>
            <a
              href="/coleccion"
              className="bg-[#d98c53] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Volver a la colección
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <Breadcrumbs items={breadcrumbItems} />

      <main className="pb-12 pt-6">
        <div className="container mx-auto px-4">
          {/* Sección principal del producto */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Galería de imágenes */}
              <div className="md:sticky md:top-4 self-start">
                <ProductGallery
                  images={
                    product.gallery || [
                      { id: 1, url: product.imageUrl, alt: "Imagen principal" },
                    ]
                  }
                  productName={product.name}
                />
              </div>

              {/* Información y compra */}
              <div>
                <ProductInfo
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  supernaturalPowers={product.supernaturalPowers}
                  paranormalActivityLevel={product.paranormalActivityLevel}
                  details={product.details || {}}
                />

                <div className="mt-8">
                  <ProductPurchase onAddToCart={handleAddToCart} />
                </div>

                {/* Seguro Anti-Maldición */}
                <div className="mt-8">
                  <AntiCurseInsurance
                    price={99}
                    onToggle={handleToggleInsurance}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pestañas de información */}
          <ProductTabs
            description={product.description || ""}
            history={product.history || ""}
            care={product.care || ""}
            reviews={product.reviews || []}
          />

          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
