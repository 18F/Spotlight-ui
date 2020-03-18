import React, { useState, useEffect } from 'react';

const Pagination = ({ recordCount, handleFilterQuery }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [positionInList, setPositionInList] = useState('');
  const numPages = Math.ceil(recordCount / recordsPerPage);

  const MAX_VISIBLE = 5;

  const checkPositionInList = () => {
    if (currentPage <= MAX_VISIBLE && numPages > MAX_VISIBLE) {
      setPositionInList('beginning');
    } else if (
      currentPage > MAX_VISIBLE &&
      currentPage <= numPages - MAX_VISIBLE
    ) {
      setPositionInList('middle');
    } else {
      setPositionInList('end');
    }
  };

  const handlePageNav = pageNum => {
    setCurrentPage(pageNum);
    handleFilterQuery({ page: pageNum });
    checkPositionInList();
  };

  let pageLinks = [];

  if (currentPage <= MAX_VISIBLE && numPages > MAX_VISIBLE) {
    for (let i = 1; i <= MAX_VISIBLE; i++) {
      pageLinks.push(
        <PaginationLink
          isCurrent={i === currentPage}
          pageNum={i}
          handlePageNav={handlePageNav}
          currentPage={currentPage}
        />
      );
    }
  } else if (
    currentPage > MAX_VISIBLE &&
    currentPage <= numPages - MAX_VISIBLE
  ) {
    for (let i = currentPage; i < currentPage + MAX_VISIBLE; i++) {
      pageLinks.push(
        <PaginationLink
          isCurrent={i === currentPage}
          pageNum={i}
          handlePageNav={handlePageNav}
          currentPage={currentPage}
        />
      );
    }
  } else {
    for (let i = numPages - MAX_VISIBLE; i <= numPages; i++) {
      pageLinks.push(
        <PaginationLink
          isCurrent={i === currentPage}
          pageNum={i}
          handlePageNav={handlePageNav}
          currentPage={currentPage}
        />
      );
    }
  }

  useEffect(() => checkPositionInList(), [currentPage]);

  return numPages <= 1 ? (
    ''
  ) : (
    <>
      <RecordsPerPageSelect
        recordsPerPage={recordsPerPage}
        handlePageNav={handlePageNav}
        setRecordsPerPage={setRecordsPerPage}
        handleFilterQuery={handleFilterQuery}
      />
      <nav className={`pagination ${positionInList}`}>
        <ul>
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageNav(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          <li className="firstPage">
            <PaginationLink
              pageNum={1}
              handlePageNav={handlePageNav}
              currentPage={currentPage}
            />
          </li>
          {pageLinks.map((link, i) => (
            <li key={i}>{link}</li>
          ))}
          <li className="lastPage">
            <PaginationLink
              pageNum={numPages}
              handlePageNav={handlePageNav}
              currentPage={currentPage}
            />
          </li>
          <li>
            <button
              disabled={currentPage === numPages}
              onClick={() => handlePageNav(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
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

const PaginationLink = ({ isCurrent, pageNum, handlePageNav, className }) => {
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
      className={className}
    >
      {pageNum}
    </button>
  );
};

export default Pagination;
