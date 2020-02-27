import React from 'react';
import YAMLData from '../data/config.yml';

export const QueryContext = React.createContext({});

const dictionary = {
  branch: 'domaintype',
  present: 'status_code',
};

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

  // if (filterList.includes('page-type'))

  return filterList
    .filter(f => f != 'scan-date' && f != 'page-type') // Neither scan-date or page-type should be params
    .map(f => (f in dictionary ? dictionary[f] : f))
    .map(f => (!basicFields.includes(f) ? `data.${f}` : f));
};

const keyFromValue = (obj, val) => {
  return Object.keys(obj).find(key => obj[key] === val);
};

const pageTypeOptions = () => {};

const QueryProvider = ({ scanType, children }) => {
  scanType = scanType == '200scanner' ? 'search200' : scanType;
  const filterList = YAMLData[scanType].filters;

  let filterListNames = filterList.map(f => {
    return typeof f === 'object' ? Object.keys(f)[0] : f;
  });

  if (filterListNames.includes('page-type')) {
    filterList.map(f => {
      Object.keys(f).map(k => {
        if (k == 'page-type') filterListNames = filterListNames.concat(f[k]);
      });
    });
  }

  filterListNames = normalizeFilterNames(filterListNames);
  console.log(filterListNames);

  const customFilterOptions = (filterList, filterName) =>
    filterList.filter(el => Object.keys(el).includes(filterName))[0];

  // ex: ("Consumer+Financial+Protection+Bureau")OR("Government+Publishing+Office")
  const generateAllString = filterName => {
    filterName = keyFromValue(dictionary, filterName) || filterName;
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
    const key = dictionary[f] || f;
    defaultQuery = Object.assign(defaultQuery, { [key]: generateAllString(f) });
  });

  return (
    <QueryContext.Provider value={defaultQuery}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
