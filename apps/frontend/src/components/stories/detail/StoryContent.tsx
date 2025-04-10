"use client";

import Image from "next/image";

interface StoryContentProps {
  content: string; // Puede ser HTML o texto plano
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
}

const StoryContent = ({
  content,
  imageUrl,
  imageAlt,
  imageCaption,
}: StoryContentProps) => {
  // Convertir saltos de línea en párrafos si es texto plano
  const formattedContent = content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-6 text-[#1a3a3a] text-lg leading-relaxed">
      {paragraph}
    </p>
  ));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        {/* Primera parte del contenido */}
        <div className="mb-8">
          {formattedContent.slice(0, Math.ceil(formattedContent.length / 2))}
        </div>

        {/* Imagen si existe */}
        {imageUrl && (
          <figure className="my-12">
            <div className="relative rounded-lg overflow-hidden bg-[#1a3a3a] w-full h-72 md:h-96">
              {imageUrl.startsWith("/") ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt || "Imagen del artículo"}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#d1c5a5]">
                  [Imagen: {imageAlt || "Imagen del artículo"}]
                </div>
              )}
            </div>
            {imageCaption && (
              <figcaption className="text-center mt-3 text-sm text-gray-600 italic">
                {imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Segunda parte del contenido */}
        <div>
          {formattedContent.slice(Math.ceil(formattedContent.length / 2))}
        </div>
      </div>
    </div>
  );
};

export default StoryContent;
