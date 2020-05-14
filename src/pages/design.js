import React from 'react';
import SEO from '../components/seo';
import Report from '../components/report';
import Layout from '../components/layout';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, isUrl: true, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  {
    title: `USWDS Version`,
    accessor: obj => obj.data.uswdsversion,
  },
  {
    title: `Flag Detected`,
    accessor: obj => obj.data.flag_detected,
  },
  {
    title: `Flag in CSS`,
    accessor: obj => obj.data.flagincss_detected,
  },
  {
    title: `Merriweather Font Detected`,
    accessor: obj => obj.data.merriweatherfont_detected,
  },
  {
    title: `Public Sans Font Detected`,
    accessor: obj => obj.data.publicsansfont_detected,
  },
  {
    title: `Source Sans Font Detected`,
    accessor: obj => obj.data.sourcesansfont_detected,
  },
  {
    title: `Tables`,
    accessor: obj => obj.data.tables,
  },
  {
    title: `USA Classes Detected`,
    accessor: obj => obj.data.usa_classes_detected,
  },
  {
    title: `USA Detected`,
    accessor: obj => obj.data.usa_detected,
  },
  {
    title: `USWDS Detected`,
    accessor: obj => obj.data.uswds_detected,
  },
  {
    title: `USWDS In CSS Detected`,
    accessor: obj => obj.data.uswdsincss_detected,
  },
];

export default () => (
  <Layout>
    <SEO title="USWDS" />
    <h1>Design</h1>
    <p>
      This report displays scan results for whether USWDS is implemented on a
      domain and, if so, which version.
    </p>

    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/uswds2'}
        reportType={'design'}
      />
    </ReportQueryProvider>
  </Layout>
);
