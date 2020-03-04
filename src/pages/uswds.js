import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/config.yml';
import QueryProvider from '../components/query-provider';

export default () => (
  <div className="grid-container">
    <h1>USWDS Scans Search</h1>

    <p>Welcome to the Federal website scanner, a project developed by 18F.</p>

    <p>
      This search will search the USWDS scanner results. The query parameter
      here will search for sites that have an analysis count greater than or
      equal to the number you input. The USWDS analysis count is an attempt to
      be able to autodetect sites that use USWDS code by searching for things
      that indicate that the people who created the site used USWDS code. The
      more things the scanner finds, the more the count adds up. It is not
      perfect, but it may be a useful indicator. Details of how we make this
      count can be found in the domain-scan codebase.
    </p>

    <p>
      The best indicator if a site is using USWDS code is the version tag, which
      can be found in some of the CSS files. You can select for this with the
      versions popup list.
    </p>

    <QueryProvider scanType={'uswds2'}>
      <Scan
        scanType={'uswds2'}
        columns={YAMLData.uswds2.columns}
        filters={YAMLData.uswds2.filters}
      />
    </QueryProvider>
  </div>
);
