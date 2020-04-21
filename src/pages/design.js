import React from 'react';
import Report from '../components/report';
import Layout from '../components/layout';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: (obj) => obj.domain },
  { title: `Agency`, accessor: (obj) => obj.agency },
  { title: `USWDS Indicators`, accessor: (obj) => obj.data.total_score },
  {
    title: `USWDS Version`,
    accessor: (obj) => obj.data.uswdsversion,
  },
];

export default () => (
  <Layout>
    <div className="grid-container">
      <h1>Design</h1>
      <p>
        This report contains scan results pertaining to CISA requirements and
        21st Century IDEA act security requirements
      </p>
    </div>

    <ReportQueryProvider>
      <Report
        columns={columns}
        endpoint={'scans/uswds2'}
        reportType={`design`}
      />
    </ReportQueryProvider>
  </Layout>
);
