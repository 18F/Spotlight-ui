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
  <p>This report page displays data that has been gathered by the <a href="https://github.com/18F/site-scanning-documentation/blob/master/scans/DAP.md" target="_blank">Digital Analytics Program scan</a>. In addition to the download link below, there are more download options on the <a href="/data">Data page</a> and in the <a href="https://open.gsa.gov/api/spotlight-api/" target="_blank">API documentation</a>. </p>
    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/dap'}
        reportType={'analytics'}
      />
    </ReportQueryProvider>
  </Layout>
);
