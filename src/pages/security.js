import React from 'react';
import Report from '../components/report';
import Layout from '../components/layout';

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
      <h1>Security</h1>
      <p>
        This report contains scan results pertaining to CISA requirements and
        21st Century IDEA act security requirements
      </p>
    </div>
    <Report type={`Security`} columns={columns} endpoint={'scans/pshtt'} />
  </Layout>
);
