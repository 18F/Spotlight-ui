import React from 'react';
import UswdsFilters from './uswds-filters';
import QueryFilterSelect from './query-filter-select';

export default ({
  scanDateList,
  domainTypeList,
  agencies,
  handleFilterQuery,
  queryParams,
  filters,
}) => {
  const addOptionAll = optionsArr => {
    const emptyOpt = 'All';
    return [emptyOpt, ...optionsArr];
  };

  const agencyOptions = addOptionAll(agencies).map(a => {
    const value = a === `All` ? `*` : a.replace(/ /g, '+');
    return (
      <option key={a} value={value}>
        {a}
      </option>
    );
  });

  const domainTypeOptions = addOptionAll(domainTypeList).map(domain => {
    const value = domain === `All` ? `*` : domain.split('-')[1].trim();
    return (
      <option key={domain} value={value}>
        {domain}
      </option>
    );
  });

  const scanDateOptions = scanDateList.map(d => (
    <option key={d} value={d}>
      {d}
    </option>
  ));

  const getInitialValue = paramName => queryParams[paramName];

  return (
    <form
      onChange={e =>
        handleFilterQuery({ [e.target.dataset.key]: e.target.value })
      }
    >
      <fieldset>
        <legend>Filter results</legend>

        {filters.map(f => f)}

        <UswdsFilters />

        <QueryFilterSelect
          label="Filter by agency"
          name="agency"
          paramName="agency"
          optionsList={agencyOptions}
        />

        <QueryFilterSelect
          label="Filter by agency type"
          name="domainTypes"
          paramName="domaintype"
          optionsList={domainTypeOptions}
        />

        <QueryFilterSelect
          label="Filter by Scan Date"
          name="scanDate"
          paramName="scanDate"
          optionsList={scanDateOptions}
        />
      </fieldset>
    </form>
  );
};
