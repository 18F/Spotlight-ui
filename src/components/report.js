import PropTypes from 'prop-types';
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

  useEffect(() => {
    setLoading(false);
  }, [reportData]);

  return (
    <>
      <h1>{reportType}</h1>
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
  reportType: PropTypes.string,
};

Report.defaultProps = {
  reportType: `Security`,
};

export default Report;

const ReportTable = ({ children }) => (
  <table className="usa-table">{children}</table>
);

const ReportTableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((c) => (
          <th key={c.title} scope="col">
            {c.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const ReportTableBody = ({ columns, records, isLoading }) => {
  return isLoading ? (
    <tbody></tbody>
  ) : (
    <tbody>
      {records.map((r) => (
        <ReportTableRow columns={columns} record={r} />
      ))}
    </tbody>
  );
};

const ReportTableRow = ({ columns, record }) => {
  return (
    <tr>
      {columns.map((c) => (
        <ReportTableCell value={c.accessor(record)} />
      ))}
    </tr>
  );
};

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
        </li>
      ))}
    </ul>
  );
};
