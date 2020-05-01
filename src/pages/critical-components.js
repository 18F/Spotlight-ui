import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Report from '../components/report';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  { title: `External Domains`, accessor: obj => obj.data.external_domains },
];

export default () => (
  <Layout>
    <SEO title="Critical Components" />
    <h1>Critical components scan results</h1>
    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/third_parties'}
        reportType={'criticalComponents'}
      />
    </ReportQueryProvider>
  </Layout>
);
