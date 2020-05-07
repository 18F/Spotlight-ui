import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ContactUs = () => (
  <Layout>
    <SEO title="Contact us" />
    <h1>Contact us</h1>

    <p>
      For general questions and comments about how Spotlight works or its scan
      results, please{' '}
      <Link to="mailto:spotlight@gsa.gov">email the team</Link>.
    </p>

    <p>
      If you have questions about analyzing and taking action on specific Spotlight results, check out{' '}
      <Link to="https://digital.gov/services/directory/">
        Digital.gov's Registry of services
      </Link>{' '}
      to find further points of contact.
    </p>
  </Layout>
);

export default ContactUs;
