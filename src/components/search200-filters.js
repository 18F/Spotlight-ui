import React from 'react';
import QueryFilterSelect from './query-filter-select';

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
    </>
  );
};

export default Search200Filters;
