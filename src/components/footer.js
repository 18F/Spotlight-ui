import React from 'react';
import { Link } from 'gatsby';
import gsaLogo from '../images/gsa-logo-w100.png';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  const toggleOrgDetails = e => {
    const btn = e.target;
    const orgDetails = document.getElementById('org-details');
    orgDetails.hidden = !orgDetails.hidden;
  };

  return (
    <footer className="usa-footer usa-footer--slim">
      <div className="grid-container usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer__primary-section">
        <div className="usa-footer__primary-container grid-row">
          <div className="mobile-lg:grid-col-8">
            <nav className="usa-footer__nav" aria-label="Footer navigation">
              <ul className="grid-row grid-gap">
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <Link className="usa-footer__primary-link" to="/about">
                    About Site Scanner
                  </Link>
                </li>
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <Link className="usa-footer__primary-link" to="/contact-us">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mobile-lg:grid-col-4">
            <address className="usa-footer__address">
              <div className="grid-row grid-gap">
                <div className="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                  <div className="usa-footer__contact-info">
                    <FontAwesomeIcon
                      className="icon icon--mail"
                      icon={faEnvelope}
                    />
                    <a href="mailto:site-scanning@gsa.gov">
                      site-scanning@gsa.gov
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
      <div className="usa-footer__secondary-section">
        <div className="grid-container">
          <div className="usa-footer__logo grid-row grid-gap-2">
            <div className="grid-col-auto">
              <img className="usa-footer__logo-img" src={gsaLogo} alt="" />
            </div>
            <div className="grid-col-auto">
              <h3 className="usa-footer__logo-heading">
                <a href="https://gsa.gov">General Services Administration</a>
              </h3>
            </div>
            <div className="grid-col-auto learn-more">
              <button
                className="usa-button usa-button--outline toggle-org-details"
                aria-controls="org-details"
                aria-expanded="false"
                onClick={e => toggleOrgDetails(e)}
              >
                Learn More
              </button>
            </div>
          </div>

          <div class="org-expanded" id="org-details" hidden>
            <div class="grid-row tablet-lg:grid-gap-2">
              <div class="grid-col-12 tablet-lg:grid-col-5 tablet-lg:grid-offset-1">
                <div class="org-links">
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} /> For questions about
                    this website, email{' '}
                    <a href="mailto:site-scanning@gsa.gov">
                      site-scanning@gsa.gov
                    </a>
                    .
                  </p>

                  <p>
                    Additional information about the U.S. General Services
                    Administration (GSA) can be found at{' '}
                    <a
                      href="https://www.gsa.gov/about"
                      title="More about theGSA"
                    >
                      https://www.gsa.gov/about
                    </a>
                  </p>
                  <ul>
                    <li>
                      <a
                        href="https://www.gsaig.gov/"
                        title="Report fraud, waste, or abuse to the Office of the Inspector General"
                      >
                        Report fraud, waste, or abuse to the Office of the
                        Inspector General
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.gsa.gov/reference/freedom-of-information-act-foia"
                        title="Submit a Freedom of Information Act (FOIA) request"
                      >
                        Submit a Freedom of Information Act (FOIA) request
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.gsa.gov/reference/reports/budget-performance"
                        title="View budget and performance reports"
                      >
                        View budget and performance reports
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.gsa.gov/website-information/accessibility-aids"
                        title="View accessiblity statement"
                      >
                        View accessiblity statement
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.gsa.gov/about-us/organization/office-of-civil-rights/notification-and-federal-employee-antidiscrimination-and-retaliation-act-of-2002"
                        title="View No FEAR Act data"
                      >
                        View No FEAR Act data
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
