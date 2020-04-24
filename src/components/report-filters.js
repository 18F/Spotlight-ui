import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { DispatchQueryContext } from './report-query-provider';

const ReportFilters = ({ reportType }) => {
  const dictionary = { security: 'pshtt', design: 'uswds2' };
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [scanDates, setScanDates] = useState([]);

  reportType = dictionary[reportType] || reportType;

  const dispatchQuery = useContext(DispatchQueryContext);

  const fetchList = (reportType, list) => {
    return axios.get(`${API_BASE_URL}lists/${reportType}/${list}`);
  };

  const handleFilterChange = (filter) => {
    const filterName = Object.keys(filter)[0];
    if (filter[filterName] == '') {
      dispatchQuery({
        type: `REMOVE_FILTERS`,
        filtersToRemove: [filterName],
      });
    } else {
      dispatchQuery({
        type: `APPLY_FILTER`,
        newFilter: { filters: filter },
      });
    }
  };

  useEffect(() => {
    axios
      .all([
        fetchList(reportType, 'agencies'),
        axios.get(`${API_BASE_URL}lists/dates/`),
      ])
      .then(
        axios.spread((...[agencies, dates]) => {
          setAgencies(agencies.data);
          setScanDates(dates.data);
          setLoading(false);
        })
      );
  }, []);

  return loading ? (
    <div>Loading…</div>
  ) : (
    <FilterForm
      reportType={reportType}
      agencies={agencies}
      scanDates={scanDates}
      handleFilterChange={handleFilterChange}
      dispatchQuery={dispatchQuery}
    />
  );
};

export default ReportFilters;

const FilterForm = ({
  reportType,
  agencies,
  scanDates,
  handleFilterChange,
  dispatchQuery,
}) => {
  let reportSpecificFilters;

  if (reportType == 'uswds2') {
    reportSpecificFilters = (
      <UswdsFilters handleFilterChange={handleFilterChange} />
    );
  }

  if (reportType == 'pshtt') {
    reportSpecificFilters = (
      <SecurityFilters handleFilterChange={handleFilterChange} />
    );
  }

  return (
    <form className="usa-form" onSubmit={(e) => e.preventDefault}>
      <DomainFilter handleFilterChange={handleFilterChange} />
      <AgenciesFilter
        agencies={agencies}
        handleFilterChange={handleFilterChange}
      />
      <ScanDateFilter dispatchQuery={dispatchQuery} scanDates={scanDates} />
      {reportSpecificFilters}
    </form>
  );
};

const AgenciesFilter = ({ agencies, handleFilterChange }) => {
  return (
    <>
      <label className="usa-label" htmlFor="agency">
        Agency
      </label>
      <select
        className="usa-select"
        name="agency"
        id="agency"
        onChange={(e) =>
          handleFilterChange({ [e.target.name]: e.target.value })
        }
      >
        {agencies.length == 0
          ? null
          : agencies.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
      </select>
    </>
  );
};

const DomainFilter = ({ handleFilterChange }) => {
  return (
    <>
      <label className="usa-label" htmlFor="domain">
        Domain
      </label>
      <input
        className="usa-input"
        type="text"
        id="domain"
        name="domain"
        onChange={(e) =>
          handleFilterChange({ [e.target.name]: `${e.target.value}*` })
        }
      />
    </>
  );
};

const ScanDateFilter = ({ dispatchQuery, scanDates }) => {
  return (
    <>
      <label className="usa-label" htmlFor="scan-date">
        Scan Date
      </label>
      <select
        className="usa-select"
        id="scan-date"
        name="scan-date"
        onChange={(e) =>
          dispatchQuery({
            type: 'CHANGE_SCAN_DATE',
            scanDate: e.target.value,
          })
        }
      >
        {scanDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </>
  );
};

const UswdsFilters = ({ handleFilterChange }) => {
  return (
    <>
      <UswdsVersionFilter handleFilterChange={handleFilterChange} />
    </>
  );
};

const UswdsVersionFilter = ({ handleFilterChange }) => {
  const versions = [
    '',
    0,
    'v2.3.1',
    'v2.0.3',
    'v1.1.0',
    'v1.4.1',
    'v1.6.3',
    'v2.2.1',
    'v0.14.0',
  ];

  return (
    <>
      <label className="usa-label" htmlFor="uswds-version">
        USWDS Version
      </label>
      <select
        className="usa-select"
        id="uswds-version"
        name="uswds-version"
        onChange={(e) =>
          handleFilterChange({ 'data.uswdsversion': e.target.value })
        }
      >
        {versions.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
};

const SecurityFilters = ({ handleFilterChange }) => {
  return (
    <>
      <HstsFilter handleFilterChange={handleFilterChange} />
      <HttpsFilter handleFilterChange={handleFilterChange} />
    </>
  );
};

const HstsFilter = ({ handleFilterChange }) => {
  return (
    <>
      <label className="usa-label" htmlFor="supports-hsts">
        HSTS Support
      </label>
      <select
        className="usa-select"
        id="supports-hsts"
        name="supports-hsts"
        onChange={(e) => handleFilterChange({ 'data.HSTS': e.target.value })}
      >
        <option value={''}></option>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </>
  );
};

const HttpsFilter = ({ handleFilterChange }) => {
  return (
    <>
      <label className="usa-label" htmlFor="supports-https">
        HTTPS Support
      </label>
      <select
        className="usa-select"
        id="supports-https"
        name="supports-https"
        onChange={(e) =>
          handleFilterChange({ 'data.HTTPS Live': e.target.value })
        }
      >
        <option value={''}></option>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </>
  );
};
