import React from 'react';
import Scan from '../components/scan';

export default () => (
  <div className="grid-container">
    <h1>Sitemap Page</h1>
    <p>Welcome to the Federal website scanner, a project developed by 18F!</p>

    <p>
      This page will let you view information about the various /sitemap.xml
      pages out there
    </p>
    <Scan
      scanType={'sitemap'}
      columns={{
        domain: 'Domain',
        agency: 'Agency',
        domaintype: 'Branch',
        status_code: 'Status Code',
        scan_data_url: 'Scan data URL',
        url_tag_count: 'URL Tag Count',
        sitemap_locations_from_robotstxt: 'Sitemap Locations from robots.txt',
      }}
      defaultQuery={{
        page: 1,
        'data.status_code': '200',
      }}
    />
  </div>
);
