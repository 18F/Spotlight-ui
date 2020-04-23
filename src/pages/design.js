import React from 'react';
import Report from '../components/report';
import Layout from '../components/layout';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, key: `domain`, accessor: (obj) => obj.domain },
  { title: `Agency`, key: `agency`, accessor: (obj) => obj.agency },
  {
    title: `USWDS Indicators`,
    key: `data.total_score`,
    accessor: (obj) => obj.data.total_score,
  },
  {
    title: `USWDS Version`,
    key: `data.uswdsversion`,
    accessor: (obj) => obj.data.uswdsversion,
  },
];

export default () => (
  <Layout>
    <div className="grid-container">
      <h1>Design</h1>
      <p>
        This report displays scan results for whether USWDS is implemented on a
        domain and, if so, which version.
      </p>
    </div>

    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/uswds2'}
        reportType={'design'}
      />
    </ReportQueryProvider>
  </Layout>
);
