"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";

interface ProductTabsProps {
  description: string;
  history: string;
  care: string;
  reviews: {
    id: number;
    author: string;
    date: string;
    rating: number;
    content: string;
    supernaturalExperience?: string;
  }[];
}

const ProductTabs = ({
  description,
  history,
  care,
  reviews,
}: ProductTabsProps) => {
  const tabs = [
    { key: "description", label: "DESCRIPCIÓN", content: description },
    { key: "history", label: "HISTORIA", content: history },
    { key: "care", label: "CUIDADOS", content: care },
    { key: "reviews", label: "RESEÑAS", content: reviews },
  ];

  return (
    <div className="product-tabs">
      <Tab.Group>
        <Tab.List className="flex rounded-t-lg overflow-hidden">
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              className={({ selected }: { selected: boolean }) =>
                `py-3 px-4 text-sm font-medium focus:outline-none flex-1 text-center
                ${
                  selected
                    ? "bg-[#1a3a3a] text-[#d1c5a5]"
                    : "bg-[#e8e4d9] text-[#1a3a3a] hover:bg-opacity-70 transition-colors"
                }`
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="border border-t-0 border-gray-200 rounded-b-lg">
          {/* Descripción */}
          <Tab.Panel className="p-6 focus:outline-none">
            <div className="prose max-w-none text-[#1a3a3a]">
              <p>{description}</p>
            </div>
          </Tab.Panel>

          {/* Historia */}
          <Tab.Panel className="p-6 focus:outline-none">
            <div className="prose max-w-none text-[#1a3a3a]">
              <p>{history}</p>
            </div>
          </Tab.Panel>

          {/* Cuidados */}
          <Tab.Panel className="p-6 focus:outline-none">
            <div className="prose max-w-none text-[#1a3a3a]">
              <p>{care}</p>
            </div>
          </Tab.Panel>

          {/* Reseñas */}
          <Tab.Panel className="p-6 focus:outline-none">
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-[#1a3a3a]">
                        {review.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>

                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? "text-[#d98c53]"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-[#1a3a3a] mb-3">{review.content}</p>

                    {review.supernaturalExperience && (
                      <div className="bg-[#e8e4d9] p-3 rounded-md">
                        <h4 className="text-sm font-medium text-[#1a3a3a] mb-1">
                          Experiencia sobrenatural:
                        </h4>
                        <p className="text-sm italic text-[#1a3a3a]">
                          "{review.supernaturalExperience}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-gray-500">
                No hay reseñas todavía para este producto.
              </p>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductTabs;
