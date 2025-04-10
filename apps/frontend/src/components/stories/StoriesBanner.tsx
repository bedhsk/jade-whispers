"use client";

interface StoriesBannerProps {
  title: string;
  description: string;
}

const StoriesBanner = ({ title, description }: StoriesBannerProps) => {
  return (
    <div className="bg-[#1a3a3a] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#d1c5a5] text-center">
          {title}
        </h1>
        <p className="text-center text-[#d1c5a5] mt-4 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StoriesBanner;
