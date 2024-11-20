// components/Pagination.tsx
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md text-white bg-gray-800 mr-2 hover:bg-gray-600 transition-colors"
      >
        Anterior
      </button>
      <span className="select-none">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md text-white bg-gray-800 ml-2 hover:bg-gray-600 transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
