import React from 'react';
import { render, act } from '@testing-library/react';
import axiosMock from 'axios';
import Report from '../report';
import ReportQueryProvider from '../report-query-provider';
import { API_BASE_URL } from '../../constants';

jest.mock('axios');

describe('Report', () => {
  const columns = [
    { title: `Domain`, accessor: obj => obj.domain },
    { title: `Agency`, accessor: obj => obj.agency },
    { title: `Supports HSTS`, accessor: obj => obj.data.HSTS },
    { title: `Supports HTTPS`, accessor: obj => obj.data['HTTPS Live'] },
    { title: `Headers`, accessor: obj => obj.data.endpoints.https.headers },
  ];

  const respObj = {
    count: 4914,
    results: [
      {
        domain: '1.usa.gov',
        scantype: 'pshtt',
        domaintype: '',
        organization: '',
        agency: 'General Services Administration',
        data: {
          HSTS: true,
          'HTTPS Live': true,
          endpoints: {
            https: {
              headers: { Connection: 'keep-alive' },
            },
          },
        },
      },
    ],
  };

  it('loads data from the API', async () => {
    const dateUrl = `${API_BASE_URL}lists/dates/`;
    const agencyUrl = `${API_BASE_URL}lists/pshtt/agencies`;
    const reportUrl = `${API_BASE_URL}scans/pshtt/?page=1`;

    axiosMock.get.mockImplementation(url => {
      switch (url) {
        case dateUrl:
          return { data: ['2020-04-20'] };
        case agencyUrl:
          return { data: ['AMTRAK', 'Consumer Financial Protection Bureau'] };
        case reportUrl:
          return { data: respObj };
        default: {
          return {};
        }
      }
    });

    await act(async () => {
      render(
        <ReportQueryProvider>
          <Report
            columns={columns}
            reportType={'security'}
            endpoint={'scans/pshtt'}
          />
        </ReportQueryProvider>
      );
    });

    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get).toHaveBeenCalledWith(dateUrl);
    expect(axiosMock.get).toHaveBeenCalledWith(agencyUrl);
    expect(axiosMock.get).toHaveBeenCalledWith(reportUrl);
  });
});
