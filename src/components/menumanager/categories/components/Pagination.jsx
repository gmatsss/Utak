import React from "react";

const Pagination = ({ totalPages, currentPage, changePage }) => {
  return (
    <div className="flex justify-end items-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => changePage(number)}
          className={`py-2 px-4 ${
            currentPage === number
              ? "bg-black text-white"
              : "bg-white text-gray-700"
          } rounded-lg`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
