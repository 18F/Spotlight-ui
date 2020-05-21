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

const columns = [
  { title: `Domain`, accessor: obj => obj.domain },
  { title: `Agency`, accessor: obj => obj.agency },
  { title: `Supports HSTS`, accessor: obj => obj.data.HSTS },
  { title: `Supports HTTPS`, accessor: obj => obj.data['HTTPS Live'] },
  { title: `Headers`, accessor: obj => obj.data.endpoints?.https?.headers },
];

const dateUrl = `${API_BASE_URL}lists/dates/`;
const agencyUrl = `${API_BASE_URL}lists/pshtt/agencies`;
const reportUrl = `${API_BASE_URL}scans/pshtt/?page=1`;
const csvUrl = `${API_BASE_URL}scans/pshtt/csv/`;

const renderReport = () => {
  const utils = render(
    <ReportQueryProvider>
      <Report
        columns={columns}
        reportType={'security'}
        endpoint={'scans/pshtt'}
      />
    </ReportQueryProvider>
  );
  return utils;
};

describe('A <Report>', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  describe('that loads correctly', () => {
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

    it('displays a loading indicator', () => {
      const utils = renderReport();
      waitFor(() => {
        expect(utils.getByTestId('loading-table')).toBeInTheDocument();
      });
    });

    it('filters data based on user input', async () => {
      let utils;

      await act(async () => {
        utils = renderReport();
      });

      await waitFor(() => {
        expect(axiosMock.get).toHaveBeenCalledTimes(3);
        expect(axiosMock.get).toHaveBeenCalledWith(dateUrl);
        expect(axiosMock.get).toHaveBeenCalledWith(agencyUrl);
        expect(axiosMock.get).toHaveBeenCalledWith(reportUrl);
      });

      const domainFilter = utils.getByTestId('domain-filter');

      fireEvent.change(domainFilter, {
        target: { value: '18f' },
      });

      await waitFor(() => {
        expect(axiosMock.get).toHaveBeenLastCalledWith(
          `${reportUrl}&domain=18f*`
        );
      });

      const filterUrl = `${reportUrl}&domain=18f*&agency="Consumer+Financial+Protection+Bureau"`;
      const agencyFilter = utils.getByTestId('agency-filter');

      // It applies a filter when an agency is selected
      fireEvent.change(agencyFilter, {
        target: { value: 'Consumer Financial Protection Bureau' },
      });

      await waitFor(() => {
        expect(axiosMock.get).toHaveBeenLastCalledWith(filterUrl);
      });

      // It sets the CSV download link to the filter string
      expect(
        utils.getByText('Download these results as a CSV').closest('a')
      ).toHaveAttribute(
        'href',
        `${csvUrl}?domain=18f*&agency="Consumer+Financial+Protection+Bureau"`
      );

      // It removes a filter when the agency is deselected
      fireEvent.change(agencyFilter, {
        target: { value: ' ' },
      });

      await waitFor(() => {
        expect(axiosMock.get).toHaveBeenLastCalledWith(
          expect.stringMatching(/&domain=18f*/)
        );
      });

      //It changes the scan date when the fileter value changes
      const scanDateFilter = utils.getByTestId('scan-date-filter');

      fireEvent.change(scanDateFilter, {
        target: { value: '2020-04-20' },
      });

      await waitFor(() => {
        expect(axiosMock.get).toHaveBeenLastCalledWith(
          expect.stringMatching(/2020-04-20/)
        );
      });
    });

    it('updates the page when a pagination link is clicked', async () => {
      const utils = renderReport();

      await waitFor(() => {
        const pageOneSpan = utils.getByTestId('page-span-1');
        const pageTwoLink = utils.getByTestId('page-2');
        expect(pageOneSpan).toHaveAttribute('aria-current', 'true');
        expect(pageTwoLink).toHaveAttribute('aria-current', 'false');

        fireEvent.click(pageTwoLink);

        const pageTwoSpan = utils.getByTestId('page-span-2');
        expect(pageTwoSpan).toHaveAttribute('aria-current', 'true');
      });
    });

    it('renders domains as clickable links', async () => {
      const utils = renderReport();
      await waitFor(() => {
        expect(utils.getByText('1.usa.gov').closest('a')).toHaveAttribute(
          'href',
          'http://1.usa.gov'
        );
      });
    });

    it('displays a record count', async () => {
      const utils = renderReport();
      await waitFor(() => {
        expect(utils.getByText('4914 Results')).toBeInTheDocument();
      });
    });
  });

  describe('when loading records from failed scans', () => {
    const invalidObj = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          domain: 'ag.gov',
          scantype: 'lighthouse',
          domaintype: 'Federal Agency - Executive',
          organization: 'USDA',
          agency: 'U.S. Department of Agriculture',
          data: {
            invalid: true,
          },
          scan_data_url:
            'https://s3-us-gov-west-1.amazonaws.com/cg-852a6196-0fdb-4a01-a16f-6c24379722cb/lighthouse/ag.gov.json',
          lastmodified: '2020-05-21T01:58:20Z',
        },
      ],
    };

    beforeEach(async () => {
      axiosMock.get.mockImplementation(url => {
        switch (url) {
          case dateUrl:
            return { data: ['2020-04-20', '2020-04-21'] };
          case agencyUrl:
            return { data: ['AMTRAK', 'Consumer Financial Protection Bureau'] };
          case reportUrl:
            return { data: invalidObj };
        }
      });
    });

    afterEach(() => {
      cleanup;
      jest.clearAllMocks();
    });

    it('indicates the data are invalid', async () => {
      const utils = renderReport();
      await waitFor(() => {
        expect(utils.getByText('ag.gov').closest('tr')).toHaveClass('invalid');
      });
    });
  });

  describe('that fails to load data from the API', () => {
    beforeEach(async () => {
      axiosMock.get.mockImplementation(url => {
        switch (url) {
          case dateUrl:
            return { data: ['2020-04-20', '2020-04-21'] };
          case agencyUrl:
            return { data: ['AMTRAK', 'Consumer Financial Protection Bureau'] };
          case reportUrl:
            return '';
        }
      });
    });
    afterEach(() => {
      cleanup;
      jest.clearAllMocks();
    });

    it('loads without crashing', async () => {
      const utils = renderReport();

      await waitFor(() => {
        expect(utils.queryByTestId('loading-table')).not.toBeInTheDocument();
        expect(utils.getByTestId('filter-form')).toBeInTheDocument();
      });
    });

    it('displays an error message', async () => {
      const utils = renderReport();

      await waitFor(() => {
        expect(utils.getByTestId('alert-error')).toBeInTheDocument();
        expect(utils.queryByTestId('alert-info')).not.toBeInTheDocument();
      });
    });
  });
});
