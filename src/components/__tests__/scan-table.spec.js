import React from 'react';
import { render } from '@testing-library/react';
import ScanTable from '../scan-table';
import '@testing-library/jest-dom';

const columns = [
  'domain',
  'scantype',
  'domaintype',
  'agency',
  'status_code',
  'scan_data_url',
  'lastmodified',
];

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
  it('render column headers', () => {
    const { getByText } = render(
      <ScanTable scanData={scanData} columns={columns} />
    );

    columns.forEach(col => {
      expect(getByText(col)).toBeInTheDocument();
    });
  });
});
