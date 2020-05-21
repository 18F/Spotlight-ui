import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext, useRef } from 'react';
import ReportFilters from './report-filters';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
import { QueryContext, DispatchQueryContext } from './report-query-provider';
import Pagination from './pagination';
import Alert from './uswds/alert';

const Report = ({ reportType, columns, endpoint }) => {
  const [reportData, setReportData] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(true);
  const query = useContext(QueryContext);
  const dispatchQuery = useContext(DispatchQueryContext);

  const isInitialLoad = useRef(true);

  const strFromQuery = queryObj => {
    let str = `page=${queryObj.page}`;
    if (queryObj.filters) {
      Object.keys(queryObj.filters).map(k => {
        str += `&${k}=${queryObj.filters[k]}`;
      });
      str = str.replace(/ /g, '+');
    }
    return str;
  };

  const queryString = strFromQuery(query);
  const queryBaseUrl = query.scanDate
    ? `${API_BASE_URL}date/${query.scanDate}/`
    : API_BASE_URL;

  const fetchReportData = async () => {
    let result;
    result = await axios.get(`${queryBaseUrl}${endpoint}/?${queryString}`);

    if (typeof result.data == 'object') {
      setErrors(null);
      setRecordCount(result.data.count);
      setReportData(result.data.results);
      setReportData(result.data.results);
    } else {
      setErrors({ ...errors, apiError: `no data` });
      setRecordCount(0);
      setReportData([]);
    }
  };

  const handlePageChange = ({ page }) => {
    dispatchQuery({ type: 'CHANGE_PAGE', page: page });
  };

  useEffect(() => {
    setLoading(true);
    fetchReportData();
  }, [queryString, query.scanDate]);

  useEffect(() => {
    if (!isInitialLoad.current) {
      setLoading(false);
    } else {
      isInitialLoad.current = false;
    }
  }, [reportData]);

  return (
    <>
      {errors && (
        <Alert type={'error'} heading={'Error'}>
          There was an error loading data. Please try refreshing the page. If
          the error persists, <a href="/contact-us">please let us know</a>.
        </Alert>
      )}
      {!loading && !errors && recordCount == 0 && (
        <Alert
          type={'info'}
          heading={'No results'}
          message={'There are no results matching the criteria selected.'}
        />
      )}
      <ReportFilters reportType={reportType} />
      <Pagination
        recordCount={recordCount}
        handleFilterQuery={handlePageChange}
      />
      <div className="utilities">
        <CsvLink queryUrl={`${queryBaseUrl}${endpoint}/csv/?${queryString}`} />
        <RecordCount recordCount={recordCount} />
      </div>
      <ReportTable>
        <ReportTableHead columns={columns} />
        <ReportTableBody
          columns={columns}
          records={reportData}
          isLoading={loading}
          error={errors}
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

const RecordCount = ({ recordCount }) => {
  return <span className="record-count">{recordCount} Results</span>;
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
    <tbody>
      <tr>
        <td
          className="loading-table"
          data-testid="loading-table"
          colSpan={columns.length}
        >
          <Spinner />
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody data-testid="report-table">
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
  const invalidRecord = record.data.invalid;

  return invalidRecord ? (
    <tr className="invalid">
      <th scope="row">{record.domain}</th>
      <ReportTableCellInvalid width={columns.length - 1} />
    </tr>
  ) : (
    <tr>
      {columns.map((c, i) => (
        <ReportTableCell
          key={uuidv1()}
          value={c.accessor(record) || c.defaultValue}
          isUrl={c.title == `Domain` || c.isUrl}
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

const ReportTableCell = ({ value, isFirst, isUrl }) => {
  const parseValue = value => {
    if (isUrl) return <a href={`http://${value}`}>{value}</a>;
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

const ReportTableCellInvalid = ({ width }) => {
  return (
    <td colSpan={width}>
      Spotlight was unable to prepare a report for this domain
    </td>
  );
};

ReportTableCellInvalid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  record: PropTypes.object,
};

const ObjectList = ({ object }) => {
  const isArray = Array.isArray(object);
  return object === null ? (
    ''
  ) : (
    <ul>
      {Object.keys(object).map(k => (
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

const Spinner = () => {
  return (
    <div className="loading-indicator">
      <svg
        version="1.1"
        className="svg-loader"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 80 80"
        xmlSpace="preserve"
        height="80"
      >
        <path
          id="spinner"
          fill="#2672de"
          d="M40,72C22.4,72,8,57.6,8,40C8,22.4,
		22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2
		s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,
		28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <span role="alert" aria-busy="true">
        Loading
      </span>
    </div>
  );
};
