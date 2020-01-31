import React, { useState } from 'react';

const Pagination = ({ recordCount, handleFilterQuery }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const numPages = Math.ceil(recordCount / recordsPerPage);

  const handlePageNav = pageNum => {
    setCurrentPage(pageNum);
    handleFilterQuery({ page: pageNum });
  };

  const pageLinks = Array(numPages)
    .fill()
    .map((_, i) => {
      const pageNum = i + 1;
      return (
        <PaginationLink
          isCurrent={pageNum === currentPage}
          pageNum={pageNum}
          handlePageNav={handlePageNav}
          currentPage={currentPage}
        />
      );
    });

  return (
    <>
      <RecordsPerPageSelect
        recordsPerPage={recordsPerPage}
        handlePageNav={handlePageNav}
        setRecordsPerPage={setRecordsPerPage}
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

const RecordsPerPageSelect = ({
  recordsPerPage,
  handleFilterQuery,
  setRecordsPerPage,
}) => {
  const recordsPerPageOptions = [20, 50, 100];
  const handleChangeRecordsPerPage = numRecords => {
    setRecordsPerPage(numRecords);
    handleFilterQuery({ page_size: numRecords });
  };

  return (
    <>
      Showing
      <select
        id="recordsPerPage"
        name="recordsPerPage"
        value={recordsPerPage}
        onChange={e => handleChangeRecordsPerPage(e.target.value)}
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
