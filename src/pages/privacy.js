import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/config.yml';
import QueryProvider from '../components/query-provider';

export default () => (
  <div className="grid-container">
    <h1>Information for Privacy Officers</h1>

    <QueryProvider scanType={'privacy'}>
      {console.log(YAMLData.privacy.columns)}
      <Scan
        scanType={'privacy'}
        columns={YAMLData.privacy.columns}
        filters={YAMLData.privacy.filters}
      />
    </QueryProvider>
  </div>
);
