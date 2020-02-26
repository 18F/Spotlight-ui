import React from 'react';
import YAMLData from '../data/config.yml';

export const QueryContext = React.createContext({});

const normalizeFilterNames = filterList => {
  const basicFields = [
    'domain',
    'scantype',
    'domaintype',
    'organization',
    'agency',
    'scan_data_url',
    'lastmodified',
  ];

  const dictionary = {
    branch: 'domaintype',
    present: 'status_code',
  };

  return filterList
    .filter(f => f != 'scan-date')
    .map(f => (f in dictionary ? dictionary[f] : f))
    .map(f => (!basicFields.includes(f) ? `data.${f}` : f));
};

const QueryProvider = ({ scanType, children }) => {
  const filterList = YAMLData[scanType].filters;
  console.log(filterList);

  let filterListNames = filterList.map(f => {
    return typeof f === 'object' ? Object.keys(f)[0] : f;
  });

  filterListNames = normalizeFilterNames(filterListNames);

  const customFilterOptions = (filterList, filterName) =>
    filterList.filter(el => Object.keys(el).includes(filterName))[0];

  // ex: ("Consumer+Financial+Protection+Bureau")OR("Government+Publishing+Office")
  const generateAllString = filterName => {
    const customFilters = customFilterOptions(filterList, filterName);

    let allString = '*';

    if (customFilters && !Array.isArray(customFilters[filterName][0])) {
      allString = customFilters[filterName]
        .map(a => `("${a.replace(/ /g, '+')}")`)
        .join('OR');
    }

    return allString;
  };

  let defaultQuery = {
    page: 1,
  };

  filterListNames.map(f => {
    defaultQuery = Object.assign(defaultQuery, { [f]: generateAllString(f) });
  });

  return (
    <QueryContext.Provider value={defaultQuery}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
