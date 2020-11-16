import 'url-search-params-polyfill';
import FIELD_OPTIONS from './data/fields';
import * as API from './data/api';

export const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object')
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

export const addOptionAll = optionsArr => {
  const emptyOpt = 'All';
  return [emptyOpt, ...optionsArr];
};

export const customFilterOptions = (filterList, filterName) =>
  filterList.filter(el => Object.keys(el).includes(filterName))[0];

export const deepPluck = (obj, keyName) => {
  return Object.keys(obj).reduce((acc, key)=> {
      acc[key] = obj[key][keyName];
      return acc;
  }, {});
}

export const buildQueryParams = (obj) => {
  let query = new URLSearchParams();
  Object.keys(obj).forEach(key => (
    query.append(key, obj[key])
  ));
  return query.toString();
}

export const parseFieldParams = (string) => {
  const obj = {};
  const searchParams = new URLSearchParams(string);
  for(var pair of searchParams.entries()) {
    obj[pair[0]] = {
      ...FIELD_OPTIONS[pair[0]] || {},
      value: pair[1],
    }
  }
  return obj;
}

export const buildApiUrl = (obj) => (
  `${API.API_DOMAIN}${API.API_PATH}?${buildQueryParams(obj)}`
)

export const buildQueryUrl = (obj) => (
  `${window.location.href.replace(window.location.search, "")}?${buildQueryParams(obj)}`
)
