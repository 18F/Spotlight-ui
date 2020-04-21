import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SecondPage = () => (
  <Layout>
    <SEO title="Contact us" />
    <h1>Contact us</h1>

    <p>
      For general questions and comments about how Site Scanner works or scan
      results, please{' '}
      <Link to="mailto:site-scanning@gsa.gov">email the team</Link>.
    </p>

    <p>
      If you have questions about analyzing and taking action on specific Site
      Scanner results, check out
      <Link to="https://digital.gov/services/directory/">
        Digital.gov's Registry of services
      </Link>
      to find further points of contact.
    </p>
  </Layout>
);

export default SecondPage;
