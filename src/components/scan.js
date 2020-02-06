import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import ScanTable from './scan-table';
import QueryForm from './query-form';
import { API_BASE_URL } from '../constants';
import useFetch from '../hooks/useFetch';

const Scan = ({ scanType, columns, defaultQuery }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanData, setScanData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scanDate, setScanDate] = useState();

  const [queryParams, setQueryParams] = useState(defaultQuery);

  const extractSelectedColumns = columns => queryObj => {
    return Object.keys(columns).map(c => queryObj[c] || queryObj.data[c]);
  };

  const formatQueryString = queryParams => {
    return Object.entries(queryParams)
      .map(entry => entry.join('='))
      .join('&')
      .replace(/=$|=(&)/g, '=*$1'); //Replace empty string with a wildcard
  };

  const queryString = formatQueryString(queryParams);

  const queryBaseUrl = scanDate
    ? `${API_BASE_URL}date/${scanDate}/`
    : API_BASE_URL;

  const fetchScanData = async () => {
    const req = new Request(
      `${queryBaseUrl}scans/${scanType}/?${queryString}`,
      {
        method: 'GET',
      }
    );
    const resp = await fetch(req);
    const json = await resp.json();

    setScanData({
      count: json.count,
      results: json.results.map(extractSelectedColumns(columns)),
    });
    setIsLoading(false);
  };

  const handlePageNav = newPageNumber => {
    setCurrentPage(newPageNumber);
  };

  const handleScanDateChange = newDate => {
    setScanDate(newDate);
  };

  const handleFilterQuery = newQuery => {
    setCurrentPage(1);

    if (newQuery.scanDate) {
      handleScanDateChange(newQuery.scanDate);
    } else {
      setQueryParams({ ...queryParams, ...newQuery });
    }
  };

  /*** Effects ***********************/
  useEffect(() => {
    fetchScanData();
  }, [currentPage, queryParams, scanDate]);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <>
      <QueryForm
        handleFilterQuery={handleFilterQuery}
        handleScanDateChange={handleScanDateChange}
        queryParams={queryParams}
        scanType={scanType}
      />
      <Pagination
        currentPage={currentPage}
        handlePageNav={handlePageNav}
        recordCount={scanData.count}
        handleFilterQuery={handleFilterQuery}
      />
      <ScanTable
        scanType={scanType}
        scanData={scanData.results}
        columns={columns}
      />
    </>
  );
};

export default Scan;
