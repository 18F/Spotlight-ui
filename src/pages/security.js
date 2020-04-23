import React from 'react';
import SEO from '../components/seo';
import Report from '../components/report';
import SEO from '../components/seo';
import Layout from '../components/layout';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: (obj) => obj.domain },
  { title: `Agency`, accessor: (obj) => obj.agency },
  {
    title: `Domain Supports HTTPS`,
    accessor: (obj) => obj.data['Domain Supports HTTPS'],
  },
  { title: `HSTS`, accessor: (obj) => obj.data.HSTS },
  {
    title: `Headers`,
    accessor: (obj) => obj.data.endpoints.https.headers,
  },
];
export default () => (
  <Layout>
    <div className="grid-container">
      <SEO title="Security" />
      <h1>Security</h1>
    </div>
    <ReportQueryProvider>
      <Report
        reportType={'security'}
        columns={columns}
        endpoint={'scans/pshtt'}
      />
    </ReportQueryProvider>
  </Layout>
);
