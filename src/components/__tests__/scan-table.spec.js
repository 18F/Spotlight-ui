import React from 'react';
import { render } from '@testing-library/react';
import ScanTable from '../scan-table';
import '@testing-library/jest-dom';

const columns = {
  domain: 'Domain',
  scantype: 'Scan Type',
  domaintype: 'Branch',
  agency: 'Agency',
  status_code: 'Status Code',
  scan_data_url: 'Scan Data URL',
  lastmodified: 'Last Modified',
};

const scanData = [
  [
    'america250.gov',
    'privacy',
    'Federal Agency - Legislative',
    'U.S. Semiquincentennial Commission',
    '200',
    'https://site-scanning.app.cloud.gov/api/v1/scans/privacy/america250.gov/',
    '2020-01-29T09:58:56Z',
  ],
  [
    'africanamericanhistorymonth.gov',
    'privacy',
    'Federal Agency - Legislative',
    'Library of Congress',
    '200',
    'https://site-scanning.app.cloud.gov/api/v1/scans/privacy/africanamericanhistorymonth.gov/',
    '2020-01-29T09:58:56Z',
  ],
  [
    'congressionalrecord.gov',
    'privacy',
    'Federal Agency - Legislative',
    'Government Publishing Office',
    '200',
    'https://site-scanning.app.cloud.gov/api/v1/scans/privacy/congressionalrecord.gov/',
    '2020-01-29T09:58:56Z',
  ],
];

describe('ScanTable', () => {
  it('renders column headers', () => {
    const { getByText, container } = render(
      <ScanTable scanData={scanData} columns={columns} />
    );
    Object.values(columns).forEach(col => {
      expect(getByText(col)).toBeInTheDocument();
      expect(container.querySelectorAll('th')).toHaveLength(
        Object.values(columns).length
      );
    });
  });

  it('renders rows from scan data', () => {
    const { getByText, container } = render(
      <ScanTable scanData={scanData} columns={columns} />
    );
    expect(container.querySelectorAll('tbody tr')).toHaveLength(
      scanData.length
    );
    scanData.forEach(row => {
      expect(getByText(row[0])).toBeInTheDocument();
    });
  });
});
