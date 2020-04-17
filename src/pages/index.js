import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import DomainScanSearch from '../components/domain-scan-search';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="usa-section grid-container text-italic font-serif-lg line-height-serif-4 text-gray-50 padding-3">
      The Site Scanner offers on-demand analysis of U.S. government websites.
      The scanner looks for indicators that websites are following best
      practices. The scanner currently scans 18008 federal domains.
    </section>
    <h2>Site Scanner best practice indicators</h2>
    <ul>
      <li>
        Presence of specific files (code.json, robots.txt, sitemap.xml and more)
      </li>
      <li>
        Use of shared services including the Digital Analytics Program (DAP) and
        the U.S. Web Design System (USWDS)
      </li>
    </ul>
    <h2>Site Scanner features</h2>
    <ul>
      <li>Scans are updated daily</li>
      <li>Scans can cover entire domains or individual websites</li>
      <li>Data is customizable</li>
      <li>Scans are available from anywhere</li>
      <li>Scans are open to everyone</li>
      <li>Results are exportable</li>
      <li>API is available</li>
    </ul>
    <DomainScanSearch />
  </Layout>
);

export default IndexPage;
