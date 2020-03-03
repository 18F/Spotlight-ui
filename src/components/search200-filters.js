import React from 'react';
import QueryFilterSelect from './query-filter-select';
import { API_BASE_URL } from '../constants';
import { addOptionAll } from '../utils';
import { customFilterOptions } from '../utils';
import useFetch from '../hooks/useFetch';

const Search200Filters = ({ filters }) => {
  const filterComponents = [];

  if (filters.includes('domain'))
    filterComponents.push(
      <label htmlFor="domainSearch" key="domainSearch">
        Domain Search
        <input
          type="text"
          name="domainSearch"
          id="domainSearch"
          data-key="domain"
        />
      </label>
    );

  if (filters.includes('organization'))
    filterComponents.push(<OrganizationFilter key="organizationFilter" />);

  const customPageTypeFilters = customFilterOptions(filters, 'page-type');
  if (filters.includes('page-type') || customPageTypeFilters)
    filterComponents.push(
      <ScanPageFilter
        key="customPageTypeFilters"
        customPageTypeFilters={customPageTypeFilters}
      />
    );

  return <>{filterComponents.map(c => c)}</>;
};

const OrganizationFilter = () => {
  const organizations = useFetch(
    `${API_BASE_URL}lists/pagedata/values/organization`,
    {}
  );

  if (!organizations.response) return <p>Loading…</p>;

  const organizationOptions = addOptionAll(organizations.response).map(org => {
    const value = org === `All` ? `*` : org.replace(/ /g, '+');

    return (
      <option key={org} value={`"${value}"`}>
        {org}
      </option>
    );
  });

  return (
    <QueryFilterSelect
      label="Organization Name"
      name="organization"
      paramName="organization"
      optionsList={organizationOptions}
    />
  );
};

const ScanPageFilter = ({ customPageTypeFilters }) => {
  let pageTypes = [];

  if (customPageTypeFilters) {
    pageTypes = customPageTypeFilters[`page-type`];
  } else {
    const scanPages = useFetch(`${API_BASE_URL}lists/pagedata/values/data/`);
    pageTypes = scanPages.response;
  }
  if (!pageTypes) return <p>Loading…</p>;

  const scanPageOptions = pageTypes.map(page => {
    return (
      <option key={page} value={page}>
        {page}
      </option>
    );
  });

  return (
    <QueryFilterSelect
      label="Page Type"
      name="scanPageType"
      paramName="scanPageType"
      optionsList={scanPageOptions}
    />
  );
};
export default Search200Filters;
