import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section class="usa-section grid-container text-italic font-serif-lg line-height-serif-4 text-gray-50 padding-3">
      Site Scanner highlights the features contributing to your federal website's success, for free.
    </section>
 
  Site Scanner is a website scanner designed for federal government professionals like you. It automatically generates critical data on federal website excellence so you can analyze and take action whenever you want.
  
  <h2> Site Scanner features</h2>
    <ul>
   <li>Scans run automatically so you can get results whenever you want</li>
   <li>Daily scan results deliver you the latest data</li>
   <li>Saves 30 days of results so you can track changes over time</li> 
   <li>Access the most comprehensive list of {{ num_domains }} federal domains and subdomains</li>
   <li>Publically-accessible and cloud-based results for easy government-wide collaboration</li>
   <li>Results surface features that most reflect excellence on federal websites, according to subject matter experts at OMB, GSA, and DHS</li>
   <li>Access customized results from our site or using our API</li> 

    </ul>
  </Layout>
);

export default IndexPage;
