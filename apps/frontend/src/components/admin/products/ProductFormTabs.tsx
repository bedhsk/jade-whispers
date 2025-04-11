"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export type TabType = "basic-info" | "mystical" | "images" | "categories";

interface ProductFormTabsProps {
  activeTab: TabType;
  productId?: string;
  isNewProduct?: boolean;
}

const ProductFormTabs: React.FC<ProductFormTabsProps> = ({
  activeTab,
  productId,
  isNewProduct = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: "basic-info", label: "Información Básica" },
    { id: "mystical", label: "Características Místicas" },
    { id: "images", label: "Imágenes" },
    { id: "categories", label: "Categorías/Efectos" },
  ];

  const getTabUrl = (tabId: string) => {
    if (isNewProduct) {
      return `/admin/products/new/${tabId}`;
    }
    return `/admin/products/edit/${productId}/${tabId}`;
  };

  // Eliminamos esta función que bloqueaba la navegación
  // const isTabDisabled = (tabIndex: number) => {
  //   if (isNewProduct) {
  //     const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  //     return tabIndex > currentTabIndex;
  //   }
  //   return false;
  // };

  return (
    <div className="mb-6">
      <div className="flex border-b border-[#d1c5a5]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={getTabUrl(tab.id)}
              className={`px-6 py-3 text-sm font-medium rounded-t-md ${
                isActive
                  ? "bg-[#1a3a3a] text-white"
                  : "bg-[#f5f2e8] text-[#1a3a3a] hover:bg-[#e8e4d9]"
              } cursor-pointer`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFormTabs;
