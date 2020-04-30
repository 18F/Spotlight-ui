import PropTypes from 'prop-types';
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

  const strFromQuery = queryObj => {
    let str = `page=${queryObj.page}`;
    if (queryObj.filters) {
      Object.keys(queryObj.filters).map(k => {
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
    const result = await axios.get(
      `${queryBaseUrl}${endpoint}/?${queryString}`
    );
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

  useEffect(() => {
    setLoading(false);
  }, [reportData]);

  return (
    <>
      <ReportFilters reportType={reportType} />
      <Pagination
        recordCount={recordCount}
        handleFilterQuery={handlePageChange}
      />
      <CsvLink queryUrl={`${queryBaseUrl}${endpoint}/csv/?${queryString}`} />
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

const ReportTableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(c => (
          <th key={uuidv1()} scope="col">
            {c.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

ReportTableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
};

const ReportTableBody = ({ columns, records, isLoading }) => {
  return isLoading ? (
    <tbody></tbody>
  ) : (
    <tbody>
      {records.map(r => (
        <ReportTableRow key={uuidv1()} columns={columns} record={r} />
      ))}
    </tbody>
  );
};

ReportTableBody.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  records: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

const ReportTableRow = ({ columns, record }) => {
  // console.log(record);
  return (
    <tr>
      {columns.map((c, i) => (
        <ReportTableCell
          key={uuidv1()}
          value={c.accessor(record)}
          isFirst={i == 0}
        />
      ))}
    </tr>
  );
};

ReportTableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  record: PropTypes.object,
};

const ReportTableCell = ({ value, isFirst }) => {
  const parseValue = value => {
    if (typeof value == 'boolean') return String(value);
    if (typeof value == 'object') return <ObjectList object={value} />;
    return value;
  };

  value = parseValue(value);
  const boolClass = value => {
    if (value == 'true' || value == '1') return 'true';
    if (value == 'false' || value == '0') return 'false';
    return null;
  };

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
  const isArray = Array.isArray(object);
  return object === null ? (
    ''
  ) : (
    <ul>
      {Object.keys(object).map((k, i) => (
        <li key={uuidv1()}>
          {!isArray && <strong>{k}: </strong>}
          {object[k]}
        </li>
      ))}
    </ul>
  );
};

ObjectList.propTypes = {
  record: PropTypes.object,
};
