import React from 'react';
import QueryFilterSelect from './query-filter-select';

const statusCodeQueryTypes = {
  '200': 'Present',
  '!(200)': 'Not Present',
  '*': 'All',
};

const statusCodeQueryOptions = Object.entries(statusCodeQueryTypes).map(
  queryType => (
    <option key={queryType[0]} value={queryType[0]}>
      {queryType[1]}
    </option>
  )
);

const StatusCodeFilters = ({ filters, scanType }) => {
  let labelText;
  switch (scanType) {
    case 'privacy':
      labelText = 'Privacy Page Present';
      break;
    case 'sitemap':
      labelText = 'Sitemap Present';
      break;
    case 'default':
      labelText = 'Present';
  }

  return filters.includes('present') ? (
    <QueryFilterSelect
      label={labelText}
      name="status_code"
      paramName="data.status_code"
      key="data.status_code"
      optionsList={statusCodeQueryOptions}
    />
  ) : (
    ''
  );
};

export default StatusCodeFilters;
