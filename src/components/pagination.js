import React, { useState } from 'react';

const Pagination = ({
  currentPage,
  handlePageNav,
  recordCount,
  handleFilterQuery,
}) => {
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
      <RecordsPerPageSelect
        recordsPerPage={recordsPerPage}
        handleFilterQuery={handleFilterQuery}
      />
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

const RecordsPerPageSelect = ({ recordsPerPage, handleFilterQuery }) => {
  const recordsPerPageOptions = [20, 50, 100];

  return (
    <>
      Showing
      <select
        id="recordsPerPage"
        name="recordsPerPage"
        defaultValue={recordsPerPage}
        onChange={e => handleFilterQuery({ page_size: e.target.value })}
      >
        {recordsPerPageOptions.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label htmlFor="recordsPerPage">records per page.</label>
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
