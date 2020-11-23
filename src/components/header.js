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
                data-testid="site-title"
              >
                {siteTitle}
              </Link>
            </em>
          </div>
          <button className="usa-menu-btn">Menu</button>
        </div>
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
