import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/search200-filters.yml';
import { customFilterOptions } from '../utils';

const customAgencyFilters = customFilterOptions(YAMLData.filters, 'agency');
const customBranchFilters = customFilterOptions(YAMLData.filters, 'branch');

// ex: ("Consumer+Financial+Protection+Bureau")OR("Government+Publishing+Office")
const allAgenciesString = customAgencyFilters
  ? customAgencyFilters['agency']
      .map(a => `("${a.replace(/ /g, '+')}")`)
      .join('OR')
  : '*';

const allBranchesString = customBranchFilters
  ? customBranchFilters['branch']
      .map(b => `("${b.replace(/ /g, '+')}")`)
      .join('OR')
  : '*';

export default () => (
  <div className="grid-container">
    <h1>200 Scans Search</h1>
    <p>
      200 Scans Search Welcome to the Federal website scanner, a project
      developed by 18F! This search will search the 200 scanner results.
    </p>
    <Scan
      scanType={'200scanner'}
      columns={{
        domain: 'Domain',
        scantype: 'Scan Type',
        domaintype: 'Branch',
        agency: 'Agency',
        status_code: 'Status Code',
        scan_data_url: 'Scan Data URL',
        lastmodified: 'Last Modified',
      }}
      defaultQuery={{
        page: 1,
        agency: allAgenciesString,
        domaintype: allBranchesString,
      }}
      filters={YAMLData.filters}
    />
  </div>
);
