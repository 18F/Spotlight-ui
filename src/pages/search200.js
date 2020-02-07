import React from 'react';
import Scan from '../components/scan';

export default () => (
  <div className="grid-container">
    <h1>200 Scans Search</h1>
    <p>
      200 Scans Search Welcome to the Federal website scanner, a project
      developed by 18F! This search will search the 200 scanner results.
    </p>
    <Scan
      scanType={'200scanner'}
      columns={{
        domain: 'Domain',
        scantype: 'Scan Type',
        domaintype: 'Branch',
        agency: 'Agency',
        status_code: 'Status Code',
        scan_data_url: 'Scan Data URL',
        lastmodified: 'Last Modified',
      }}
      defaultQuery={{
        page: 1,
      }}
    />
  </div>
);
