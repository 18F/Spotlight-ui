import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {
  const num_domains = 35952;
  return (
    <Layout hero={<Hero />}>
      <SEO title="Home" />
      <p className="usa-prose">
        Spotlight is a set of report pages that present data about federal government websites. That means that rather than going into the weeds into any
        one particular area, you can use this data to highlight the critical 
        features that most reflect overall excellence on websites:
        <ul className="usa-list">
          <li><a href="accessibility/">Accessibility</a></li>
          <li><a href="design">Design</a></li>
          <li><a href="performance">Performance</a></li>
          <li><a href="analytics">Analytics</a></li>
          <li><a href="critical-components">Third-Party Links</a></li>
          <li><a href="security">Security</a></li>
        </ul>
      </p>

      <h2>Why Spotlight?</h2>
      <ul className="usa-list">
        <li>
          Scans run automatically, allowing results whenever you want
        </li>
        <li>Daily scan results deliver the latest data to you</li>
        <li>
          Scan results are in the cloud, open to the public, and exportable for
          easy government-wide collaboration
        </li>
        <li>
          Using the API, feed scan results directly into your government system
        </li>
      </ul>
      <h2>How Spotlight works</h2>
      <ol className="usa-list">
        <li>Select a category OR enter a URL.</li>
        <li>Filter and sort your results as needed.</li>
        <li>Export or bookmark your results to share or reference later.</li>
        <li>Analyze and take action where it matters most.</li>
      </ol>
    </Layout>
  );
};

const Hero = () => (
  <section className="usa-section intro text-italic font-serif-lg line-height-serif-4 text-gray-50 padding-3">
    <div className="grid-container">
      Spotlight highlights the features contributing to any federal website's
      success, for free.
    </div>
  </section>
);

export default IndexPage;
