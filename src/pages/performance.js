import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Report from '../components/report';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  {
    title: `Page Load Time (s)`,
    accessor: obj => obj.data['speed-index']?.displayValue,
  },
  {
    title: `Total Page Weight (bytes)`,
    accessor: obj => obj.data['total-byte-weight']?.numericValue,
  },
  {
    title: `Unminified JavaScript`,
    accessor: obj => obj.data['unminified-javascript']?.displayValue,
  },
  {
    title: `Unminified CSS`,
    accessor: obj => obj.data['unminified-css']?.displayValue,
  },
  {
    title: `Uncompressed Text`,
    accessor: obj => obj.data['uses-text-compression']?.displayValue,
  },
  {
    title: `Viewport Meta Tag Present`,
    accessor: obj => obj.data.viewport?.explanation,
    defaultValue: 'Present',
  },
];

export default () => (
  <Layout>
    <SEO title="Performance" />
    <h1>Performance scan results</h1>
    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/lighthouse'}
        reportType={'performance'}
      />
    </ReportQueryProvider>
  </Layout>
);
