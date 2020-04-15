import PropTypes from 'prop-types';
<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import ReportFilters from './report-filters';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
import { QueryContext, DispatchQueryContext } from './report-query-provider';
import Pagination from './pagination';

const Report = ({ reportType, columns, endpoint }) => {
  const [reportData, setReportData] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const query = useContext(QueryContext);
  const dispatchQuery = useContext(DispatchQueryContext);

  const strFromQuery = (queryObj) => {
    let str = `page=${queryObj.page}`;
    if (queryObj.filters) {
      Object.keys(queryObj.filters).map((k) => {
        str += `&${k}=${queryObj.filters[k]}`;
      });
      str = str.replace(' ', '+');
    }
    return str;
  };

  const queryString = strFromQuery(query);
  const queryBaseUrl = query.scanDate
    ? `${API_BASE_URL}date/${query.scanDate}/`
    : API_BASE_URL;

  const fetchReportData = async () => {
    const result = await axios(`${queryBaseUrl}${endpoint}/?${queryString}`);
    setRecordCount(result.data.count);
    setReportData(result.data.results);
  };

  const handlePageChange = ({ page }) => {
    dispatchQuery({ type: 'CHANGE_PAGE', page: page });
  };

  useEffect(() => {
    setLoading(true);
    fetchReportData();
  }, [queryString, query.scanDate]);
=======
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import axios from 'axios';

const Report = ({ reportType }) => {
  const [reportData, setReportData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: `Domain`, accessor: (obj) => obj.domain },
    { title: `Agency`, accessor: (obj) => obj.agency },
    {
      title: `Domain Supports HTTPS`,
      accessor: (obj) => obj.data['Domain Supports HTTPS'],
    },
    { title: `HSTS`, accessor: (obj) => obj.data.HSTS },
    {
      title: `Headers`,
      accessor: (obj) => obj.data.endpoints.https.headers,
    },
  ];

  const fetchReportData = async (page) => {
    const result = await axios(`${API_BASE_URL}scans/pshtt/?page=${page}`);
    setReportData(result.data.results);
  };

  useEffect(() => {
    setLoading(true);
    fetchReportData(page);
  }, [page]);
>>>>>>> Implement basic security report

  useEffect(() => {
    setLoading(false);
  }, [reportData]);

  return (
    <>
<<<<<<< HEAD
      <ReportFilters reportType={reportType} />
      <Pagination
        recordCount={recordCount}
        handleFilterQuery={handlePageChange}
      />
      <CsvLink queryUrl={`${queryBaseUrl}${endpoint}/csv/?${queryString}`} />
=======
      <h1>{reportType}</h1>
>>>>>>> Implement basic security report
      <ReportTable>
        <ReportTableHead columns={columns} />
        <ReportTableBody
          columns={columns}
          records={reportData}
          isLoading={loading}
        />
      </ReportTable>
    </>
  );
};

Report.propTypes = {
<<<<<<< HEAD
  columns: PropTypes.arrayOf(PropTypes.object),
  endpoint: PropTypes.string,
};

export default Report;
const CsvLink = ({ queryUrl }) => {
  const csvUrl = queryUrl.replace(/page=\d+(&)?/, '');
  return <a href={csvUrl}>Download these results as a CSV</a>;
};
const ReportTable = ({ children }) => (
  <div className="grid-row">
    <table className="usa-table">{children}</table>
  </div>
);

ReportTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

=======
  reportType: PropTypes.string,
};

Report.defaultProps = {
  reportType: `Security`,
};

export default Report;

const ReportTable = ({ children }) => (
  <table className="usa-table">{children}</table>
);

>>>>>>> Implement basic security report
const ReportTableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((c) => (
<<<<<<< HEAD
          <th key={uuidv1()} scope="col">
=======
          <th key={c.title} scope="col">
>>>>>>> Implement basic security report
            {c.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

<<<<<<< HEAD
ReportTableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
};

=======
>>>>>>> Implement basic security report
const ReportTableBody = ({ columns, records, isLoading }) => {
  return isLoading ? (
    <tbody></tbody>
  ) : (
    <tbody>
      {records.map((r) => (
<<<<<<< HEAD
        <ReportTableRow key={uuidv1()} columns={columns} record={r} />
=======
        <ReportTableRow columns={columns} record={r} />
>>>>>>> Implement basic security report
      ))}
    </tbody>
  );
};

<<<<<<< HEAD
ReportTableBody.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  records: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

const ReportTableRow = ({ columns, record }) => {
  return (
    <tr>
      {columns.map((c, i) => (
        <ReportTableCell
          key={uuidv1()}
          value={c.accessor(record)}
          isFirst={i == 0}
        />
=======
const ReportTableRow = ({ columns, record }) => {
  return (
    <tr>
      {columns.map((c) => (
        <ReportTableCell value={c.accessor(record)} />
>>>>>>> Implement basic security report
      ))}
    </tr>
  );
};

<<<<<<< HEAD
ReportTableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  record: PropTypes.object,
};

const ReportTableCell = ({ value, isFirst }) => {
  const parseValue = (value) => {
    if (typeof value == 'boolean') return String(value);
    if (typeof value == 'object') return <ObjectList object={value} />;
    return value;
  };

  value = parseValue(value);
  const boolClass = (value) =>
    value == 'true' || value == 'false' ? value : null;

  return isFirst ? (
    <th scope="row">{value}</th>
  ) : (
    <td className={boolClass(value)}>{value}</td>
  );
};

ReportTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool,
    PropTypes.object,
  ]),
  isFirst: PropTypes.bool,
};

const ObjectList = ({ object }) => {
  return (
    <ul>
      {Object.keys(object).map((k, i) => (
        <li key={uuidv1()}>
          <strong>{k}:</strong> {object[k]}
=======
const ReportTableCell = ({ value }) => {
  const parseValue = (value) => {
    if (typeof value == 'boolean') return String(value);
    if (typeof value == 'object') return <HeadersList headers={value} />;
    return value;
  };
  console.log(parseValue(value));

  return <td>{parseValue(value)}</td>;
};

const HeadersList = ({ headers }) => {
  console.log(headers);
  return (
    <ul>
      {Object.keys(headers).map((k) => (
        <li>
          <strong>{k}:</strong> {headers[k]}
>>>>>>> Implement basic security report
        </li>
      ))}
    </ul>
  );
};
<<<<<<< HEAD

ObjectList.propTypes = {
  record: PropTypes.object,
};
=======
>>>>>>> Implement basic security report
