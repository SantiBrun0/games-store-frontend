
import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(5)

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPages = () => {
    setStartPage(startPage - 5)
    setEndPage(endPage -5)
  };

  const goToNextPages = () => {
    setStartPage(startPage + 5)
    setEndPage(endPage + 5)
  };

  useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage])
  

  return (
    <div className='pagination'>
      <button onClick={goToPrevPages} disabled={startPage == 1}>
        {"<<"}
      </button>
      {pages.map((page) => (
        <button key={page} disabled={page > totalPages} onClick={() => goToPage(page)} className={currentPage === page ? 'pag-active' : ''}>
          {page}
        </button>
      ))}
      <button onClick={goToNextPages} disabled={totalPages - startPage <= 4}>
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;