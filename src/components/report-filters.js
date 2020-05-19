import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { DispatchQueryContext } from './report-query-provider';

const ReportFilters = ({ reportType }) => {
  const dictionary = {
    security: 'pshtt',
    design: 'uswds2',
    criticalComponents: 'third_parties',
    analytics: 'dap',
    performance: 'lighthouse',
    accessibility: 'lighthouse',
  };
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [scanDates, setScanDates] = useState([]);

  reportType = dictionary[reportType] || reportType;

  const dispatchQuery = useContext(DispatchQueryContext);

  const fetchList = (reportType, list) => {
    return axios.get(`${API_BASE_URL}lists/${reportType}/${list}`);
  };

  const handleFilterChange = filter => {
    const filterName = Object.keys(filter)[0];
    if ((filter[filterName] == '" "') | (filter[filterName] == '')) {
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
    const fetchData = async () => {
      const agencies = await fetchList(reportType, 'agencies');
      const dates = await axios.get(`${API_BASE_URL}lists/dates/`);
      setAgencies(agencies.data);
      setScanDates(dates.data);
      setLoading(false);
    };

    fetchData();
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

  if (reportType == 'dap') {
    reportSpecificFilters = (
      <AnalyticsFilters handleFilterChange={handleFilterChange} />
    );
  }

  return (
    <form
      className="usa-form"
      onSubmit={e => e.preventDefault}
      data-testid="filter-form"
    >
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
        data-testid="agency-filter"
        onChange={e =>
          handleFilterChange({ [e.target.name]: `"${e.target.value}"` })
        }
      >
        <option key={'select-all'} value=" ">
          - Select -
        </option>
        {agencies.length == 0
          ? null
          : agencies.map(a => (
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
        data-testid="domain-filter"
        onChange={e =>
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
        data-testid="scan-date-filter"
        onChange={e =>
          dispatchQuery({
            type: 'CHANGE_SCAN_DATE',
            scanDate: e.target.value,
          })
        }
      >
        {scanDates.map(date => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </>
  );
};

const UswdsFilters = ({ handleFilterChange }) => {
  const checkboxFilters = [
    {
      property: 'data.publicsansfont_detected',
      label: 'Public Sans Font Detected',
    },
    {
      property: 'data.merriweatherfont_detected',
      label: 'Merriweather Font Detected',
    },
    {
      property: 'data.sourcesansfont_detected',
      label: 'Source Sans Font Detected',
    },
    {
      property: 'data.flag_detected',
      label: 'Flag Detected',
    },
    {
      property: 'data.flagincss_detected',
      label: 'Flag in CSS Detected',
    },
    {
      property: 'data.tables',
      label: 'Tables',
    },
    {
      property: 'data.usa_classes_detected',
      label: 'USA Classes Detected',
    },
    {
      property: 'data.usa_detected',
      label: 'USA Detected',
    },
    {
      property: 'data.uswds_detected',
      label: 'USWDS Detected',
    },
    {
      property: 'data.uswdsincss_detected',
      label: 'USWDS in CSS Detected',
    },
  ];
  return (
    <>
      <UswdsVersionFilter handleFilterChange={handleFilterChange} />
      <div className="grid-row">
        {checkboxFilters.map(f => (
          <NumericFilterCheckbox
            handleFilterChange={handleFilterChange}
            property={f.property}
            label={f.label}
            key={f.property}
          />
        ))}
      </div>
    </>
  );
};

const UswdsVersionFilter = ({ handleFilterChange }) => {
  const versions = [
    '- Select -',
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
        onChange={e =>
          handleFilterChange({ 'data.uswdsversion': e.target.value })
        }
      >
        {versions.map(v => {
          const version = v == '- Select -' ? '' : v;
          return (
            <option key={v} value={version}>
              {v}
            </option>
          );
        })}
      </select>
    </>
  );
};

const NumericFilterCheckbox = ({ handleFilterChange, label, property }) => {
  return (
    <div className="usa-checkbox tablet:grid-col-6">
      <input
        className="usa-checkbox__input"
        type="checkbox"
        name={property}
        id={property}
        onChange={e =>
          handleFilterChange({
            [property]: e.target.checked ? `[1 TO *]` : '',
          })
        }
      />
      <label htmlFor={property} key={property} className="usa-checkbox__label">
        {label}
      </label>
    </div>
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
        onChange={e => handleFilterChange({ 'data.HSTS': e.target.value })}
      >
        <option value={''}>- Select -</option>
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
        onChange={e =>
          handleFilterChange({ 'data.HTTPS Live': e.target.value })
        }
      >
        <option value={''}>- Select -</option>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </>
  );
};

const AnalyticsFilters = ({ handleFilterChange }) => {
  return (
    <>
      <DapDetectedFilter handleFilterChange={handleFilterChange} />
    </>
  );
};

const DapDetectedFilter = ({ handleFilterChange }) => {
  return (
    <>
      <label className="usa-label" htmlFor="dap-detected">
        DAP Detected
      </label>
      <select
        className="usa-select"
        id="dap-detected"
        name="dap-detected"
        onChange={e =>
          handleFilterChange({ 'data.dap_detected': e.target.value })
        }
      >
        <option value={''}>- Select -</option>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </>
  );
};
