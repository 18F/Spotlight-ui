import { Link } from 'gatsby';
import Banner from './uswds/banner';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <>
    <Banner />
    <header className="usa-header site-header usa-header--basic">
      <div className="grid-container">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            <div class="usa-logo" id="basic-logo">
              <em class="usa-logo__text">
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
            <button class="usa-menu-btn">Menu</button>
          </div>
          <nav aria-label="Primary navigation" class="usa-nav">
            <button class="usa-nav__close">
              <img src="/assets/img/close.svg" alt="close" />
            </button>
            <ul class="usa-nav__primary usa-accordion">
              <li class="usa-nav__primary-item">
                <button
                  class="usa-accordion__button usa-nav__link  usa-current"
                  aria-expanded="false"
                  aria-controls="basic-nav-section-one"
                >
                  <span>Current section</span>
                </button>
                <ul id="basic-nav-section-one" class="usa-nav__submenu">
                  <li class="usa-nav__submenu-item">
                    <a href="#">Navigation link</a>
                  </li>
                  <li class="usa-nav__submenu-item">
                    <a href="#">Navigation link</a>
                  </li>
                  <li class="usa-nav__submenu-item">
                    <a href="#">Navigation link</a>
                  </li>
                </ul>
              </li>
              <li class="usa-nav__primary-item">
                <a class="usa-nav__link" href="javascript:void(0)">
                  <span>Simple link</span>
                </a>
              </li>
            </ul>
          </nav>
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
