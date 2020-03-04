import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/config.yml';
import QueryProvider from '../components/query-provider';

export default () => (
  <div className="grid-container">
    <h1>Sitemap Page</h1>
    <p>Welcome to the Federal website scanner, a project developed by 18F!</p>

    <p>
      This page will let you view information about the various /sitemap.xml
      pages out there
    </p>

    <QueryProvider scanType={'sitemap'}>
      <Scan
        scanType={'sitemap'}
        columns={YAMLData.sitemap.columns}
        filters={YAMLData.sitemap.filters}
      />
    </QueryProvider>
  </div>
);
