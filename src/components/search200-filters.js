import React from 'react';
import QueryFilterSelect from './query-filter-select';
import { API_BASE_URL } from '../constants';
import { addOptionAll } from '../utils';
import useFetch from '../hooks/useFetch';

const Search200Filters = ({ props }) => {
  return (
    <>
      <label htmlFor="domainSearch">
        Domain Search
        <input
          type="text"
          name="domainSearch"
          id="domainSearch"
          data-key="domain"
        />
      </label>
      <OrganizationFilter />
    </>
  );
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

export default Search200Filters;
