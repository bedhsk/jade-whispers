"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Genera un array de números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];

    // Siempre mostrar la primera página
    pages.push(1);

    // Mostrar páginas alrededor de la página actual
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Siempre mostrar la última página si hay más de una página
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Eliminar duplicados (puede pasar si currentPage es 1 o totalPages)
    return [...new Set(pages)];
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 py-8">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`h-10 w-10 rounded-full flex items-center justify-center
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#e8e4d9] text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors"
          }`}
      >
        &laquo;
      </button>

      {/* Números de página */}
      {pageNumbers.map((page, index) => {
        // Agregar elipsis si hay saltos en la numeración
        const showEllipsis = index > 0 && page > pageNumbers[index - 1] + 1;

        return (
          <div key={page} className="flex items-center">
            {showEllipsis && <span className="mx-1 text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 rounded-full flex items-center justify-center
                ${
                  currentPage === page
                    ? "bg-[#1a3a3a] text-[#d1c5a5] font-bold"
                    : "bg-[#e8e4d9] text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors"
                }`}
            >
              {page}
            </button>
          </div>
        );
      })}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`h-10 w-10 rounded-full flex items-center justify-center
          ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#e8e4d9] text-[#1a3a3a] hover:bg-[#d1c5a5] transition-colors"
          }`}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
