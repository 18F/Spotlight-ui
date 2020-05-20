import { Link } from 'gatsby';
import Banner from './uswds/banner';
import PropTypes from 'prop-types';
import React from 'react';
import close from '../../node_modules/uswds/dist/img/close.svg';

const Header = ({ siteTitle }) => (
  <>
    <Banner />
    <div className="usa-overlay" />
    <header className="usa-header site-header usa-header--basic">
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <div className="usa-logo" id="basic-logo">
            <em className="usa-logo__text">
              <Link
                to="/"
                title="Home"
                aria-label="Home"
                className="site-title"
              >
                {siteTitle}
              </Link>
            </em>
          </div>
          <button className="usa-menu-btn">Menu</button>
        </div>
        <nav aria-label="Primary navigation" className="usa-nav">
          <button className="usa-nav__close">
            <img src={close} alt="close" />
          </button>
          <ul className="usa-nav__primary usa-accordion">
            <li className="usa-nav__primary-item">
              <button
                className={`usa-accordion__button usa-nav__link`}
                aria-controls={`basic-nav-section-one`}
                aria-expanded={false}
              >
                <span>Reports</span>
              </button>
              <ul
                id={`basic-nav-section-one`}
                className="usa-nav__submenu"
                hidden
              >
                <li className="usa-nav__submenu-item">
                  <Link to="/design">Design</Link>
                </li>
                <li className="usa-nav__submenu-item">
                  <Link to="/security">Security</Link>
                </li>
                <li className="usa-nav__submenu-item">
                  <Link to="/accessibility">Accessibility</Link>
                </li>
                <li className="usa-nav__submenu-item">
                  <Link to="/analytics">Analytics</Link>
                </li>
                <li className="usa-nav__submenu-item">
                  <Link to="/performance">Performance</Link>
                </li>
                <li className="usa-nav__submenu-item">
                  <Link to="/critical-components">Third-Party Links</Link>
                </li>
              </ul>
            </li>
            <li className="usa-nav__primary-item">
              <Link className="usa-nav__link" to={`/about`}>
                <span>About</span>
              </Link>
            </li>
            <li className="usa-nav__primary-item">
              <Link className="usa-nav__link" to={`/contact-us`}>
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
