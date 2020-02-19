import React from 'react';
import QueryFilterSelect from './query-filter-select';
import { customFilterOptions } from '../utils';

const StatusCodeFilters = ({ filters, scanType }) => {
  let labelText;

  const customPresentOptions = customFilterOptions(filters, 'present');
  const statusCodeQueryTypes = customPresentOptions
    ? customPresentOptions.present
    : [{ Present: '200' }, { 'Not Present': '!(200)' }, { All: '*' }];

  const statusCodeQueryOptions = statusCodeQueryTypes.map(queryType => {
    const key = Object.keys(queryType)[0];
    const value = queryType[key];

    return (
      <option key={value} value={value}>
        {key}
      </option>
    );
  });

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

  return filters.includes('present') || customPresentOptions ? (
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
