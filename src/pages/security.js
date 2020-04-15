import React from 'react';
import Report from '../components/report';
import SEO from '../components/seo';
import Layout from '../components/layout';
import YAMLData from '../data/config.yml';
import QueryProvider from '../components/query-provider';

export default () => (
  <Layout>
    <SEO title="Security" />
    <h1>Security scan results</h1>

    <Report type={`Security`} />
  </Layout>
);
