import React from 'react';
import UswdsFilters from './uswds-filters';
import StatusCodeFilter from './status-code-filter';
import QueryFilterSelect from './query-filter-select';
import Search200Filters from './search200-filters';
import { API_BASE_URL } from '../constants';
import { addOptionAll } from '../utils';
import useFetch from '../hooks/useFetch';

const QueryForm = ({ filters, scanType, scanDateList, handleFilterQuery }) => {
  const filterComponents = [];

  switch (scanType) {
    case 'uswds2':
      filterComponents.push(<UswdsFilters filters={filters} />);
      break;
    case 'privacy':
    case 'sitemap':
      filterComponents.push(
        <StatusCodeFilter filters={filters} scanType={scanType} />
      );
      break;
    case '200scanner':
      filterComponents.push(<Search200Filters filters={filters} />);
      break;
  }

  if (filters.includes('agency')) {
    filterComponents.push(<AgenciesFilter scanType={scanType} />);
  }

  if (filters.includes('branch')) {
    filterComponents.push(<DomainTypesFilter scanType={scanType} />);
  }

  if (filters.includes('scan-date')) {
    filterComponents.push(<ScanDateFilter scanDateList={scanDateList} />);
  }

  return (
    <form
      className="query-filter-form"
      onChange={e =>
        handleFilterQuery({
          [e.target.dataset.key]: e.target.value,
        })
      }
    >
      <fieldset>
        <legend>Filter results</legend>

        {filterComponents}
      </fieldset>
    </form>
  );
};

const AgenciesFilter = ({ scanType }) => {
  const agencies = useFetch(`${API_BASE_URL}lists/${scanType}/agencies/`, {});

  if (!agencies.response) return <p>Loading...</p>;

  const agencyOptions = addOptionAll(agencies.response).map(a => {
    const value = a === `All` ? `*` : a.replace(/ /g, '+');

    return (
      <option key={a} value={`"${value}"`}>
        {a}
      </option>
    );
  });

  return (
    <QueryFilterSelect
      label="Filter by agency"
      name="agency"
      paramName="agency"
      optionsList={agencyOptions}
    />
  );
};

const DomainTypesFilter = ({ scanType }) => {
  const domainTypes = useFetch(
    `${API_BASE_URL}lists/${scanType}/domaintypes/`,
    {}
  );

  if (!domainTypes.response) return <p>Loading...</p>;

  const domainTypeOptions = addOptionAll(domainTypes.response).map(domain => {
    const value = domain === `All` ? `*` : domain.split('-')[1].trim();

    return (
      <option key={domain} value={value}>
        {domain}
      </option>
    );
  });

  return (
    <QueryFilterSelect
      label="Filter by Agency Type"
      name="domaintype"
      paramName="domaintype"
      optionsList={domainTypeOptions}
    />
  );
};

const ScanDateFilter = () => {
  const scanDates = useFetch(`${API_BASE_URL}lists/dates/`, {});

  if (!scanDates.response) return <p>Loading…</p>;

  const scanDateOptions = scanDates.response.map(d => (
    <option key={d} value={d}>
      {d}
    </option>
  ));
  return (
    <QueryFilterSelect
      label="Filter by Scan Date"
      name="scanDate"
      paramName="scanDate"
      optionsList={scanDateOptions}
    />
  );
};

export default QueryForm;
