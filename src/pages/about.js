import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
const About = () => (
  <Layout>
    <SEO title="About" />
    <h1>About Spotlight</h1>
    <h3>
      Spotlight is a set of report pages that present data about federal government websites. It is powered by the Site Scanning program and is
      available through the support of General Service
      Administration's <a href="https://10x.gsa.gov/">10x program</a>.
    </h3>

    <h2>What is the Site Scanning program?</h2>
    <p>
      The vision of this project is to create a way for TTS to offer a low-cost, automated scanning solution so federal stakeholders can determine the best practices government websites are following and identify ways to improve website performance for the public and public servants. We envision an on-demand service that not only reduces the legwork that scanning has historically entailed, but also enriches the data for analyses available. Performance would be measured on a variety of key dimensions like mobile-friendliness, load times, responsiveness. Not only could stakeholders access this critical data, they'd also be able to copy the scan engine and build off of it for their own, customized uses. Our primary focus is on an open, automated, inexpensive, and fast scanning solution. You can explore the
      code further on the project's {' '}
      <a href="https://github.com/18F/spotlight">
        public Github repository
      </a>
      .
    </p>

    <h2>Access the Data</h2>
    <p>
      You can access all of the Site Scanning program's data via the{' '}
      <a href="https://open.gsa.gov/api/spotlight-api/">API</a>
    </p>
  </Layout>
);
export default About;
