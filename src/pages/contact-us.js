import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ContactUs = () => (
  <Layout>
    <SEO title="Contact us" />
    <h1>Contact us</h1>

    <p>
      For general questions and comments about how Spotlight works or its scan
      results, please <a href="mailto:spotlight@gsa.gov">email the team</a>.
    </p>

    <p>
      If you have questions about analyzing and taking action on specific
      Spotlight results, check out{' '}
      <a href="https://digital.gov/services/directory/">
        Digital.gov's Registry of services
      </a>{' '}
      to find further points of contact.
    </p>
  </Layout>
);

export default ContactUs;
