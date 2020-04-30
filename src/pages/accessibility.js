import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Report from '../components/report';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  {
    title: `Text Size`,
    accessor: obj => obj.data[`font-size`]?.displayValue,
  },
  {
    title: `Tap Target Size`,
    accessor: obj => obj.data[`tap-targets`]?.displayValue,
  },
  {
    title: `Images Have Alt Text`,
    accessor: obj => obj.data[`image-alt`]?.score,
  },
  {
    title: `Text Has Sufficient Color Contrast`,
    accessor: obj => obj.data[`color-contrast`]?.score,
  },
];

export default () => (
  <Layout>
    <SEO title="Accessibility" />
    <h1>Accessibility scan results</h1>
    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/lighthouse'}
        reportType={'accessibility'}
      />
    </ReportQueryProvider>
  </Layout>
);
