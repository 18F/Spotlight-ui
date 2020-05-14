import React from 'react';
import SEO from '../components/seo';
import Report from '../components/report';
import Layout from '../components/layout';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  { title: `Supports HSTS`, accessor: obj => obj.data.HSTS },
  { title: `Supports HTTPS`, accessor: obj => obj.data['HTTPS Live'] },
  { title: `Headers`, accessor: obj => obj.data.endpoints.https.headers },
];
export default () => (
  <Layout>
    <SEO title="Security" />
    <h1>Security</h1>
    <p>
      This report contains scan results pertaining to CISA requirements and 21st
      Century IDEA act security requirements
    </p>
    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/pshtt'}
        reportType={'security'}
      />
    </ReportQueryProvider>
  </Layout>
);
