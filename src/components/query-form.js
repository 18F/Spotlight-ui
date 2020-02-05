import React from 'react';
import UswdsFilters from './uswds-filters';
import PrivacyFilters from './privacy-filters';
import QueryFilterSelect from './query-filter-select';
import { API_BASE_URL } from '../constants';
import { addOptionAll } from '../utils';
import useFetch from '../hooks/useFetch';

const QueryForm = ({ scanType, scanDateList, handleFilterQuery }) => {
  return (
    <form
      onChange={e =>
        handleFilterQuery({
          [e.target.dataset.key]: e.target.value,
        })
      }
    >
      <fieldset>
        <legend>Filter results</legend>

        {/* <PrivacyFilters /> */}
        <UswdsFilters />

        <AgenciesFilter scanType={scanType} />

        <DomainTypesFilter scanType={scanType} />

        <ScanDateFilter scanDateList={scanDateList} />
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

const ScanDateFilter = ({ scanDateList }) => {
  const scanDateOptions = scanDateList.map(d => (
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
