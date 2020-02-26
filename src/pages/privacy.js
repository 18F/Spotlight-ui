import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/config.yml';
import QueryProvider from '../components/query-provider';

export default () => (
  <div className="grid-container">
    <h1>Information for Privacy Officers</h1>

    <QueryProvider scanType={'privacy'}>
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
        filters={YAMLData.privacy.filters}
      />
    </QueryProvider>
  </div>
);
