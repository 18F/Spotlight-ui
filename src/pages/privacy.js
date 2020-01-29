import React from 'react';
import Scan from '../components/scan';

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
    />
  </div>
);
