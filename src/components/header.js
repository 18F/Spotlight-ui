import { Link } from 'gatsby';
import Banner from './uswds/banner';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <>
    <Banner />
    <header className="usa-header site-header">
      <div class="grid-container">
        <Link to="/" className="site-title">
          {siteTitle}
        </Link>
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
