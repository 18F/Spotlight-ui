import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/privacy-filters.yml';

export default () => (
  <div className="grid-container">
    <h1>Information for Privacy Officers</h1>
    <Scan
      scanType={'privacy'}
      columns={{
        domain: 'Domain',
        scantype: 'Scan Type',
        domaintype: 'Branch',
        agency: 'Agency',
        status_code: 'Status Code',
        scan_data_url: 'Scan Data URL',
        lastmodified: 'Last Modified',
      }}
      filters={YAMLData.filters}
      defaultQuery={{
        page: 1,
        'data.status_code': '200',
      }}
    />
  </div>
);
