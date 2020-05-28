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

  const scanType = dictionary[reportType] || reportType;

  const dispatchQuery = useContext(DispatchQueryContext);

  const fetchList = (reportType, list) => {
    return axios.get(
      `${API_BASE_URL}lists/${reportType}/${list}/?api_key=${process.env.GATSBY_API_KEY}`
    );
    // return axios.get(`${API_BASE_URL}lists/${reportType}/${list}/`, {
    //   headers: { 'X-Api-Key': process.env.GATSBY_API_KEY },
    // });
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
      const agencies = await fetchList(scanType, 'agencies');
      // const dates = await axios.get(`${API_BASE_URL}lists/dates/`, {
      //   headers: { 'X-Api-Key': process.env.GATSBY_API_KEY },
      // });
      const dates = await axios.get(
        `${API_BASE_URL}lists/dates/?api_key=${process.env.GATSBY_API_KEY}`
      );
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

  if (reportType == 'design') {
    reportSpecificFilters = (
      <UswdsFilters handleFilterChange={handleFilterChange} />
    );
  }

  if (reportType == 'security') {
    reportSpecificFilters = (
      <SecurityFilters handleFilterChange={handleFilterChange} />
    );
  }

  if (reportType == 'analytics') {
    reportSpecificFilters = (
      <AnalyticsFilters handleFilterChange={handleFilterChange} />
    );
  }

  if (reportType == 'performance') {
    reportSpecificFilters = (
      <PerformanceFilters handleFilterChange={handleFilterChange} />
    );
  }

  if (reportType == 'accessibility') {
    reportSpecificFilters = (
      <AccessibilityFilters handleFilterChange={handleFilterChange} />
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
      label: 'Public Sans Font',
    },
    {
      property: 'data.merriweatherfont_detected',
      label: 'Merriweather Font',
    },
    {
      property: 'data.sourcesansfont_detected',
      label: 'Source Sans Font',
    },
    {
      property: 'data.flag_detected',
      label: 'Flag',
    },
    {
      property: 'data.flagincss_detected',
      label: 'Flag in CSS',
    },
    {
      property: 'data.tables',
      label: 'Tables',
    },
    {
      property: 'data.usa_classes_detected',
      label: 'USA Classes',
    },
    {
      property: 'data.usa_detected',
      label: 'USA',
    },
    {
      property: 'data.uswds_detected',
      label: 'USWDS',
    },
    {
      property: 'data.uswdsincss_detected',
      label: 'USWDS in CSS',
    },
  ];
  return (
    <>
      <UswdsVersionFilter handleFilterChange={handleFilterChange} />
      <fieldset className="usa-fieldset checkbox-group">
        <legend>USWDS Features</legend>
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
      </fieldset>
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
      <PresentAbsentFilter
        handleFilterChange={handleFilterChange}
        label="HSTS Support"
        property={`data.HSTS`}
        presentText={`Yes`}
        absentText={`No`}
        boolean={true}
      />
      <PresentAbsentFilter
        handleFilterChange={handleFilterChange}
        label="HTTPS Support"
        property={`data.HTTPS Live`}
        presentText={`Yes`}
        absentText={`No`}
        boolean={true}
      />
    </>
  );
};

const AnalyticsFilters = ({ handleFilterChange }) => {
  return (
    <PresentAbsentFilter
      handleFilterChange={handleFilterChange}
      label="DAP Detected"
      property={`data.dap_detected`}
      presentText={`Yes`}
      absentText={`No`}
      boolean={true}
    />
  );
};

const PerformanceFilters = ({ handleFilterChange }) => {
  return (
    <PresentAbsentFilter
      handleFilterChange={handleFilterChange}
      label="Viewport Meta Tag"
      property={`data.viewport.score`}
    />
  );
};

const AccessibilityFilters = ({ handleFilterChange }) => {
  return (
    <>
      <PresentAbsentFilter
        handleFilterChange={handleFilterChange}
        label="Text Size is Legible"
        property={`data.font-size.score`}
        presentText={`Text is legible`}
        absentText={`Some text may be too small`}
      />

      <PresentAbsentFilter
        handleFilterChange={handleFilterChange}
        label="Tap Target Size"
        property={`data.tap-targets.score`}
        presentText={`Tap targets are large enough`}
        absentText={`Some tap targets may be too small`}
      />

      <PresentAbsentFilter
        handleFilterChange={handleFilterChange}
        label="Alt text"
        property={`data.image-alt.score`}
      />

      <PresentAbsentFilter
        handleFilterChange={handleFilterChange}
        label="Color Contrast"
        property={`data.font-size.score`}
        presentText={`Tap targets are large enough`}
        absentText={`Some tap targets may be too small`}
      />
    </>
  );
};

const PresentAbsentFilter = ({
  handleFilterChange,
  label,
  property,
  presentText,
  absentText,
  boolean,
}) => {
  const id = label.toLowerCase().split(' ').join('-');
  const presentVal = boolean ? 'true' : 1;
  const absentVal = boolean ? 'false' : 0;

  return (
    <>
      <label className="usa-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="usa-select"
        id="id"
        name="id"
        onChange={e => handleFilterChange({ [property]: e.target.value })}
      >
        <option value={''}>- Select -</option>
        <option value={presentVal}>{presentText || `Present`}</option>
        <option value={absentVal}>{absentText || `Not Present`}</option>
      </select>
    </>
  );
};
