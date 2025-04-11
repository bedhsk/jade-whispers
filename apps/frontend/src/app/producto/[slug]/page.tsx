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
import productService, { Product } from "@/services/api/productService";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [withInsurance, setWithInsurance] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Obtener producto por slug
        const productSlug = Array.isArray(slug) ? slug[0] : slug;
        const productData = await productService.getProductBySlug(productSlug);

        if (productData === null) {
          // Producto no encontrado
          setError("Producto no encontrado");
          setProduct(null);
          return;
        }

        setProduct(productData);

        // Obtener productos relacionados
        if (productData?.id) {
          try {
            const related = await productService.getRelatedProducts(
              productData.id,
              4
            );
            setRelatedProducts(related);
          } catch (relatedErr) {
            // Si falla la carga de productos relacionados, simplemente los dejamos vacíos
            console.error(
              "Error al cargar productos relacionados:",
              relatedErr
            );
            setRelatedProducts([]);
          }
        }
      } catch (err: any) {
        console.error("Error al cargar el producto:", err);
        setError(
          err.response?.data?.message ||
            "Ha ocurrido un error al cargar el producto. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = (quantity: number) => {
    if (!product) return;

    const finalPrice =
      Number(product.price) * quantity + (withInsurance ? 99 : 0);

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
          label: product.categories[0]?.category.name || "Categoría",
          href: `/coleccion?categoria=${product.categories[0]?.category.name.toLowerCase().replace(/\s+/g, "-")}`,
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

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="pb-12 pt-6">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold text-[#1a3a3a] mb-4">
              {error || "Producto no encontrado"}
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

  // Preparar datos para componentes de UI
  const productDetails: Record<string, string> = {};
  if (product.dynasty) productDetails["Dinastía"] = product.dynasty;
  if (product.material) productDetails["Material"] = product.material;
  if (product.dimensions) productDetails["Dimensiones"] = product.dimensions;
  if (product.origin) productDetails["Origen"] = product.origin;
  if (product.certificateId)
    productDetails["ID Certificado"] = product.certificateId;

  // Verificar si hay al menos una imagen
  const galleryImages =
    product.images.length > 0
      ? product.images.map((img) => ({
          id: img.id,
          url: img.imageUrl,
          alt: img.altText || product.name,
        }))
      : [{ id: 0, url: "/images/product-placeholder.jpg", alt: product.name }];

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
                  images={galleryImages}
                  productName={product.name}
                />
              </div>

              {/* Información y compra */}
              <div>
                <ProductInfo
                  category={{
                    name:
                      product.categories[0]?.category.name || "Sin categoría",
                    slug:
                      product.categories[0]?.category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-") || "sin-categoria",
                  }}
                  name={product.name}
                  price={Number(product.price)}
                  supernaturalPowers={product.supernaturalPowers || ""}
                  paranormalActivityLevel={
                    product.paranormalActivityLevel || 50
                  }
                  details={productDetails}
                />

                <div className="mt-8">
                  <ProductPurchase
                    onAddToCart={handleAddToCart}
                    stock={product.stock}
                  />
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
            history={product.supernaturalStory || ""}
            care={product.careInstructions || ""}
            reviews={product.reviews.map((review) => ({
              id: review.id,
              author: review.user.name || "Usuario anónimo",
              date: new Date(review.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              rating: review.rating,
              content: review.comment,
              supernaturalExperience: review.supernaturalExperience,
            }))}
          />

          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <RelatedProducts
              products={relatedProducts.map((p) => ({
                id: p.id,
                name: p.name,
                price: Number(p.price),
                imageUrl:
                  p.images.find((img) => img.isPrimary)?.imageUrl ||
                  "/images/product-placeholder.jpg",
                description:
                  p.comicDescription || p.description.substring(0, 100),
                slug: p.slug,
                category: {
                  name: p.categories[0]?.category.name || "Sin categoría",
                  slug:
                    p.categories[0]?.category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-") || "sin-categoria",
                },
              }))}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
