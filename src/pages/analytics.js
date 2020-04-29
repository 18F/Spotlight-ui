import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Report from '../components/report';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  { title: `DAP Detected`, accessor: obj => obj.data.dap_detected },
  { title: `DAP Parameters`, accessor: obj => obj.data.dap_parameters },
];

export default () => (
  <Layout>
    <SEO title="Analytics" />
    <h1>Analytics scan results</h1>
    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/dap'}
        reportType={'analytics'}
      />
    </ReportQueryProvider>
  </Layout>
);
