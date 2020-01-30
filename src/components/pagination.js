import React, { useState } from 'react';

const Pagination = ({ currentPage, handlePageNav, recordCount }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const numPages = Math.ceil(recordCount / recordsPerPage);

  const pageLinks = Array(numPages)
    .fill()
    .map((_, i) => {
      const pageNum = i + 1;
      return (
        <PaginationLink
          isCurrent={pageNum === currentPage}
          pageNum={pageNum}
          handlePageNav={handlePageNav}
        />
      );
    });

  return (
    <>
      Showing {recordsPerPage} results per page.
      <nav className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageNav(currentPage - 1)}
        >
          Prev
        </button>
        {pageLinks.map((link, i) => (
          <li key={i}>{link}</li>
        ))}
        <button
          disabled={currentPage === numPages}
          onClick={() => handlePageNav(currentPage + 1)}
        >
          Next
        </button>
      </nav>
    </>
  );
};

const PaginationLink = ({ isCurrent, pageNum, handlePageNav }) => {
  return (
    <button
      key={pageNum}
      href="#"
      onClick={() => {
        handlePageNav(pageNum);
        return false;
      }}
      disabled={isCurrent}
      aria-current={isCurrent}
      aria-label={`Page ${pageNum}`}
    >
      {pageNum}
    </button>
  );
};

export default Pagination;
