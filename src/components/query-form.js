import React from 'react';
import UswdsFilters from './uswds-filters';
import StatusCodeFilter from './status-code-filter';
import QueryFilterSelect from './query-filter-select';
import Search200Filters from './search200-filters';
import { API_BASE_URL } from '../constants';
import { addOptionAll } from '../utils';
import useFetch from '../hooks/useFetch';
import { customFilterOptions } from '../utils';

const QueryForm = ({
  filters,
  scanType,
  scanDateList,
  handleFilterQuery,
  defaultQuery,
  csvUrl,
}) => {
  const filterComponents = [];

  switch (scanType) {
    case 'uswds2':
      filterComponents.push(<UswdsFilters key="uswds" filters={filters} />);
      break;
    case 'privacy':
    case 'sitemap':
      filterComponents.push(
        <StatusCodeFilter
          key="statusCodeFilter"
          filters={filters}
          scanType={scanType}
        />
      );
      break;
    case '200scanner':
      filterComponents.push(
        <Search200Filters
          key="search200"
          defaultQuery={defaultQuery}
          filters={filters}
        />
      );
      break;
  }

  const customAgencyFilters = customFilterOptions(filters, 'agency');

  if (filters.includes('agency') || customAgencyFilters) {
    filterComponents.push(
      <AgenciesFilter
        key="agencies"
        scanType={scanType}
        customAgencyFilters={customAgencyFilters}
        defaultQuery={defaultQuery}
      />
    );
  }

  const customBranchFilters = customFilterOptions(filters, 'branch');

  if (filters.includes('branch') || customBranchFilters) {
    filterComponents.push(
      <DomainTypesFilter
        key="domaintypes"
        scanType={scanType}
        customBranchFilters={customBranchFilters}
        defaultQuery={defaultQuery}
      />
    );
  }

  if (filters.includes('scan-date')) {
    filterComponents.push(
      <ScanDateFilter key="scandate" scanDateList={scanDateList} />
    );
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
      <a href={csvUrl}>Download a CSV of these results</a>
    </form>
  );
};

const AgenciesFilter = ({ scanType, customAgencyFilters, defaultQuery }) => {
  let agencies = [];
  const allString = defaultQuery.agency;

  // TODO: refactor call to customAgencyFilters out of this component
  if (customAgencyFilters) {
    agencies = customAgencyFilters['agency'];
  } else {
    const agenciesReq = useFetch(
      `${API_BASE_URL}lists/${scanType}/agencies/`,
      {}
    );
    agencies = agenciesReq.response;
  }

  if (!agencies) return <p>Loading...</p>;

  const agencyOptions = addOptionAll(agencies).map(a => {
    if (a == '') return;
    const value = a === `All` ? allString : `"${a.replace(/ /g, '+')}"`;

    return (
      <option key={a} value={value}>
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

const DomainTypesFilter = ({ scanType, customBranchFilters, defaultQuery }) => {
  let domainTypes = [];
  const allString = defaultQuery.branch;

  if (customBranchFilters) {
    domainTypes = customBranchFilters.branch;
  } else {
    const domainTypesReq = useFetch(
      `${API_BASE_URL}lists/${scanType}/domaintypes/`,
      {}
    );
    domainTypes = domainTypesReq.response;
  }

  if (!domainTypes) return <p>Loading...</p>;

  const domainTypeOptions = addOptionAll(domainTypes).map(domain => {
    if (domain == '') return;
    const value = domain === `All` ? allString : domain.split('-')[1].trim();

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
