import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ContactUs = () => (
  <Layout>
    <SEO title="Contact us" />
    <h1>Contact us</h1>

  <p>
  To learn more about the Site Scanning program and the methodology for each scan, the project's <a href="https://github.com/18F/site-scanning-documentation">documentation hub</a> is a good place to start.  
  </p>
    <p>
      For general questions and comments about how the program works or its scan
      results, please <a href="mailto:site-scanning@gsa.gov">email the team</a> or file an issue <a href="https://github.com/18F/Spotlight/issues">in the project repository</a>.
    </p>


  </Layout>
);

export default ContactUs;
