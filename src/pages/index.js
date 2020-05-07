import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import check from '../../node_modules/uswds/dist/img/correct9.svg';
import SEO from '../components/seo';

const reportCards = [
  {
    name: `Accessibility`,
    criteria: [`Color contrast`, `Tap target size`, `Type size`, `Alt text`],
  },
  { name: `Design`, criteria: [`USWDS present`, `USWDS  version`] },
  { name: `Performance`, criteria: [`Page size`, `Load time`, `Redirects`] },
  { name: `Analytics`, criteria: [`DAP present`, `DAP parameters`] },
  {
    name: `Presence of Critical Components`,
    criteria: [`Third-party URLs`, `Site search`, `Required policy links`],
  },
  {
    name: `Security`,
    criteria: [
      `Server software/version`,
      `HTTPS Support`,
      `HSTS`,
      `X-Frame-Options`,
      `X-XSS-Protection`,
      `X-Content-Type-Options`,
    ],
  },
];

const IndexPage = () => {
  const num_domains = 35952;
  return (
    <Layout hero={<Hero />}>
      <SEO title="Home" />
      <p className="usa-prose">
        Spotlight is an open source website scanner for federal government
        professionals who want to see the big picture of a federal website's
        excellence. That means that rather than going into the weeds into any
        one particular area, use Spotlight to highlight the critical features that most
        reflect overall excellence on websites:
      </p>
      <ReportCardGrid reportCards={reportCards} />
      <h2>Why Spotlight?</h2>
      <ul className="usa-list">
        <li>
          Scans run automatically so you can get results whenever you want
        </li>
        <li>Daily scan results deliver you the latest data</li>
        <li>Saves 30 days of results so you can track changes over time</li>
        <li>
          With {num_domains}, the most comprehensive list of federal domains and
          subdomains
        </li>
        <li>
          Scan results are in the cloud, open to the public, and exportable for
          easy government-wide collaboration
        </li>
        <li>
          Up-to-date with the latest laws and subject matter expertise from OMB,
          GSA, and DHS
        </li>
        <li>
          Feed scan results directly into your government systemn using the API
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

const ReportCardGrid = ({ reportCards }) => {
  return (
    <div className="grid-row">
      {reportCards.map(card => (
        <ReportCard key={card.name} report={card} />
      ))}
    </div>
  );
};
const ReportCard = ({ report }) => {
  return (
    <div className="grid-col-4">
      <h3>{report.name}</h3>
      <ul className="usa-list margin-0">
        {report.criteria.map(criterion => (
          <li key={criterion}>{criterion}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
