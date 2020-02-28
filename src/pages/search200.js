import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/config.yml';
import QueryProvider from '../components/query-provider';

export default () => (
  <div className="grid-container">
    <h1>200 Scans Search</h1>
    <p>
      200 Scans Search Welcome to the Federal website scanner, a project
      developed by 18F! This search will search the 200 scanner results.
    </p>
    <QueryProvider scanType={'200scanner'}>
      <Scan
        scanType={'200scanner'}
        columns={YAMLData.search200.columns}
        filters={YAMLData.search200.filters}
      />
    </QueryProvider>
  </div>
);
