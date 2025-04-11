"use client";

import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  slug?: string;
  category?:
    | string
    | {
        name: string;
        slug: string;
      };
}

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

const RelatedProducts = ({
  products,
  title = "Productos relacionados",
}: RelatedProductsProps) => {
  return (
    <div className="related-products mt-12">
      <h2 className="text-2xl font-bold text-[#1a3a3a] mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
