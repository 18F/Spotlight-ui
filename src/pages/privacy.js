import React from 'react';
import Scan from '../components/scan';
import QueryFilterSelect from '../components/query-filter-select';

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

const privacyFilters = [
  <QueryFilterSelect
    label="Privacy Page Present"
    name="status_code"
    paramName="data.status_code"
    key="data.status_code"
    optionsList={privacyQueryOptions}
  />,
];

export default () => (
  <div className="grid-container">
    <h1>Information for Privacy Officers</h1>
    <Scan
      scanType={'privacy'}
      columns={[
        'domain',
        'scantype',
        'domaintype',
        'agency',
        'status_code',
        'scan_data_url',
        'lastmodified',
      ]}
      defaultQuery={{
        page: 1,
        'data.status_code': '200',
      }}
      filters={privacyFilters}
    />
  </div>
);
