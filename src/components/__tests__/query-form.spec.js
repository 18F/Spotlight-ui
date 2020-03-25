import React from 'react';
import { render } from '@testing-library/react';
import QueryForm from '../query-form';
import '@testing-library/jest-dom';

const scanDateList = ['2020-02-02', '2020-02-01'];

describe('QueryForm', () => {
  it('renders USWDS filters when the scantype is `uswds`', () => {
    const { getByText } = render(
      <QueryForm
        scanType="uswds2"
        scanDateList={scanDateList}
        filters={['uswds-version']}
      />
    );

    expect(getByText('USWDS Version')).toBeInTheDocument();
  });
  it('renders privacy filters when the scantype is `privacy`', () => {
    const { getByText } = render(
      <QueryForm
        scanType="privacy"
        scanDateList={scanDateList}
        filters={['present']}
      />
    );

    expect(getByText('Privacy Page Present')).toBeInTheDocument();
  });
  it('renders a CSV export link', () => {
    const { getByText } = render(
      <QueryForm
        scanType="privacy"
        scanDateList={scanDateList}
        filters={['present']}
        csvUrl={
          '/api/v1/scans/privacy/csv/?data.status_code=*&agency=(%22Consumer+Financial+Protection+Bureau%22)OR(%22Government+Publishing+Office%22)&domaintype=(%22Federal+Agency+-+Executive%22)OR(%22Federal+Agency+-+Legislative%22)'
        }
      />
    );

    const link = getByText('Download a CSV of these results');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('/api/v1/scans/privacy/csv/')
    );
  });
});
