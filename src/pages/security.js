import React from 'react';
import Report from '../components/report';
import Layout from '../components/layout';
import YAMLData from '../data/config.yml';
import ReportQueryProvider from '../components/report-query-provider';

const columns = [
  { title: `Domain`, accessor: (obj) => obj.domain },
  { title: `Agency`, accessor: (obj) => obj.agency },
  { title: `Supports HSTS`, accessor: (obj) => obj.data.HSTS },
  { title: `Supports HTTPS`, accessor: (obj) => obj.data['HTTPS Live'] },
  { title: `Headers`, accessor: (obj) => obj.data.endpoints.https.headers },
];
export default () => (
  <Layout>
    <div className="grid-container">
      <h1>Security</h1>

      <ReportQueryProvider>
        <Report columns={columns} endpoint={'scans/pshtt'} />
      </ReportQueryProvider>
    </div>
  </Layout>
);
