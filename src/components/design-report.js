import PropTypes from 'prop-types';
import React from 'react';
import useFetch from '../hooks/useFetch';

const Report = ({ reportType }) => {
  const columns = [{ title: `Domain Enforces HTTPS` }, { title: `HSTS` }];

  return (
    <>
      <h1>{reportType}</h1>
      <ReportTable>
        <ReportTableHead columns={columns} />
        <ReportTableBody />
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

const ReportTableBody = ({ data }) => {
  return <tbody></tbody>;
};
