import React from 'react';
import Scan from '../components/scan';
import YAMLData from '../data/privacy-filters.yml';
import { customFilterOptions } from '../utils';

const customAgencyFilters = customFilterOptions(YAMLData.filters, 'agency');

// ex: ("Consumer+Financial+Protection+Bureau")OR("Government+Publishing+Office")
const allString = customAgencyFilters
  ? customAgencyFilters['agency']
      .map(a => `("${a.replace(/ /g, '+')}")`)
      .join('OR')
  : '*';

export default () => (
  <div className="grid-container">
    <h1>Information for Privacy Officers</h1>
    <Scan
      scanType={'privacy'}
      columns={{
        domain: 'Domain',
        scantype: 'Scan Type',
        domaintype: 'Branch',
        agency: 'Agency',
        status_code: 'Status Code',
        scan_data_url: 'Scan Data URL',
        lastmodified: 'Last Modified',
      }}
      filters={YAMLData.filters}
      defaultQuery={{
        page: 1,
        'data.status_code': '200',
        agency: allString,
      }}
    />
  </div>
);
