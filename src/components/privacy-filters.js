import React from 'react';
import QueryFilterSelect from './query-filter-select';

const privacyQueryTypes = {
  '200': 'Present',
  '!(200)': 'Not Present',
  '*': 'All',
};

const privacyQueryOptions = Object.entries(privacyQueryTypes).map(queryType => (
  <option key={queryType[0]} value={queryType[0]}>
    {queryType[1]}
  </option>
));

const PrivacyFilters = () => (
  <QueryFilterSelect
    label="Privacy Page Present"
    name="status_code"
    paramName="data.status_code"
    key="data.status_code"
    optionsList={privacyQueryOptions}
  />
);

export default PrivacyFilters;
