"use client";

interface CollectionBannerProps {
  title: string;
  description: string;
}

const CollectionBanner = ({ title, description }: CollectionBannerProps) => {
  return (
    <div className="bg-[#1a3a3a] py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#d1c5a5] text-center">
          {title}
        </h1>
        <p className="text-center text-[#d1c5a5] mt-4 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CollectionBanner;
