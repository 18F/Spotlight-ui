import React from 'react';
import {
  render,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMock from 'axios';
import Report from '../report';
import ReportQueryProvider from '../report-query-provider';
import { API_BASE_URL } from '../../constants';

jest.mock('axios');
afterEach(() => {
  cleanup;
  jest.clearAllMocks();
});

// Required across all

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  { title: `Supports HSTS`, accessor: obj => obj.data.HSTS },
  { title: `Supports HTTPS`, accessor: obj => obj.data['HTTPS Live'] },
  { title: `Headers`, accessor: obj => obj.data.endpoints.https.headers },
];

const dateUrl = `${API_BASE_URL}lists/dates/`;
const agencyUrl = `${API_BASE_URL}lists/pshtt/agencies`;
const reportUrl = `${API_BASE_URL}scans/pshtt/?page=1`;

describe('<Report /> loading correctly', () => {
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

  let report;

  beforeEach(async () => {
    axiosMock.get.mockImplementation(url => {
      switch (url) {
        case dateUrl:
          return { data: ['2020-04-20', '2020-04-21'] };
        case agencyUrl:
          return { data: ['AMTRAK', 'Consumer Financial Protection Bureau'] };
        case reportUrl:
          return { data: respObj };
        default: {
          return { data: { ...respObj, filtered: 'YES!' } };
        }
      }
    });
    await act(async () => {
      report = render(
        <ReportQueryProvider>
          <Report
            columns={columns}
            reportType={'security'}
            endpoint={'scans/pshtt'}
          />
        </ReportQueryProvider>
      );
    });
  });

  it('loads data from the API', async () => {
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(axiosMock.get).toHaveBeenCalledWith(dateUrl);
    expect(axiosMock.get).toHaveBeenCalledWith(agencyUrl);
    expect(axiosMock.get).toHaveBeenCalledWith(reportUrl);
  });

  it('incrementally applies the domain filter when that input changes', async () => {
    const domainFilter = report.getByTestId('domain-filter');

    act(() => {
      fireEvent.change(domainFilter, {
        target: { value: '18f' },
      });
    });

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenLastCalledWith(
        `${reportUrl}&domain=18f*`
      );
    });
  });

  it('updates the query when the agency filter changes', async () => {
    const filterUrl = `${reportUrl}&agency="Consumer+Financial+Protection+Bureau"`;
    const agencyFilter = report.getByTestId('agency-filter');

    // It applies a filter when an agency is selected
    act(() => {
      fireEvent.change(agencyFilter, {
        target: { value: 'Consumer Financial Protection Bureau' },
      });
    });

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenLastCalledWith(filterUrl);
    });

    // It removes a filter when the agency is deselected
    act(() => {
      fireEvent.change(agencyFilter, {
        target: { value: ' ' },
      });
    });

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenLastCalledWith(reportUrl);
    });
  });

  it('applies the scan date filter', async () => {
    const scanDateFilter = report.getByTestId('scan-date-filter');

    act(() => {
      fireEvent.change(scanDateFilter, {
        target: { value: '2020-04-20' },
      });
    });

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenLastCalledWith(
        `${API_BASE_URL}date/2020-04-20/scans/pshtt/?page=1`
      );
    });
  });

  it('updates the page when a pagination link is clicked', async () => {
    const pageOneSpan = report.getByTestId('page-span-1');
    const pageTwoLink = report.getByTestId('page-2');

    expect(pageOneSpan).toHaveAttribute('aria-current', 'true');
    expect(pageTwoLink).toHaveAttribute('aria-current', 'false');

    act(() => {
      fireEvent.click(pageTwoLink);
    });

    await waitFor(() => {
      const pageTwoSpan = report.getByTestId('page-span-2');
      expect(pageTwoSpan).toHaveAttribute('aria-current', 'true');
    });
  });
});

describe('fail', () => {
  afterEach(cleanup);
  const respObj = {
    count: 4914,
    results: [
      {
        domain: '1.usa.gov',
        scantype: 'pshtt',
        domaintype: '',
        organization: '',
        agency: 'General Services Administration',
        data: '',
      },
    ],
  };

  let report;

  beforeEach(async () => {
    axiosMock.get.mockImplementation(url => {
      switch (url) {
        case dateUrl:
          return { data: ['2020-04-20', '2020-04-21'] };
        case agencyUrl:
          return { data: ['AMTRAK', 'Consumer Financial Protection Bureau'] };
        case reportUrl:
          return '';
        default: {
          return { data: { ...respObj, filtered: 'YES!' } };
        }
      }
    });
    await act(async () => {
      report = render(
        <ReportQueryProvider>
          <Report
            columns={columns}
            reportType={'security'}
            endpoint={'scans/pshtt'}
          />
        </ReportQueryProvider>
      );
    });
  });

  it('loads without crashing', () => {
    expect(report.getByTestId('filter-form')).toBeInTheDocument();
  });
});
