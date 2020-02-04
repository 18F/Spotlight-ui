import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import ScanTable from './scan-table';
import QueryForm from './query-form';
import { API_BASE_URL } from '../constants';

const Scan = ({ scanType, columns, defaultQuery }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanData, setScanData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scanDateList, setScanDateList] = useState([]);
  const [scanDate, setScanDate] = useState();

  const [queryParams, setQueryParams] = useState(defaultQuery);

  const extractSelectedColumns = columns => queryObj => {
    return columns.map(c => queryObj[c] || queryObj.data[c]);
  };

  const fetchScanData = async () => {
    const queryString = Object.entries(queryParams)
      .map(entry => entry.join('='))
      .join('&');

    const queryBaseUrl = scanDate
      ? `${API_BASE_URL}date/${scanDate}/`
      : API_BASE_URL;

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

  useEffect(() => {
    const fetchDates = async () => {
      const resp = await fetch(`${API_BASE_URL}lists/dates/`);
      setScanDateList(await resp.json());
    };
    fetchDates();
  }, []);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <>
      <QueryForm
        scanDateList={scanDateList}
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
