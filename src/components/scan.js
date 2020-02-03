import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import ScanTable from './scan-table';
import QueryForm from './query-form';
import { flattenObject } from '../utils';

const Scan = ({ scanType, columns, defaultQuery }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanData, setScanData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [agencies, setAgencies] = useState([]);
  const [scanDateList, setScanDateList] = useState([]);
  const [scanDate, setScanDate] = useState();
  const [domainTypeList, setDomainTypeList] = useState([]);

  const [queryParams, setQueryParams] = useState(defaultQuery);

  const API_BASE_URL = `https://site-scanning.app.cloud.gov/api/v1/`;

  const extractSelectedColumns = columns => queryObj => {
    return columns.map(c => queryObj[c] || queryObj.data[c]);
  };

  const fetchScanData = async () => {
    const flatQueryObj = flattenObject(queryParams);
    const queryString = Object.entries(flatQueryObj)
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

  const handleFilterQuery = newQuery => {
    setCurrentPage(1);
    setQueryParams({ ...queryParams, ...newQuery });
  };

  const handleScanDateChange = newDate => {
    setScanDate(newDate);
  };

  /*** Effects ***********************/
  useEffect(() => {
    fetchScanData();
  }, [currentPage, queryParams, scanDate]);

  useEffect(() => {
    const fetchAgencies = async () => {
      const resp = await fetch(`${API_BASE_URL}lists/${scanType}/agencies/`);
      setAgencies(await resp.json());
    };

    const fetchDomainTypes = async () => {
      const resp = await fetch(`${API_BASE_URL}lists/${scanType}/domaintypes/`);
      setDomainTypeList(await resp.json());
    };

    fetchAgencies();
    fetchDomainTypes();
  }, [scanType]);

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
        agencies={agencies}
        domainTypeList={domainTypeList}
        handleFilterQuery={handleFilterQuery}
        handleScanDateChange={handleScanDateChange}
        queryParams={queryParams}
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
