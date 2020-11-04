import 'url-search-params-polyfill';
import FIELD_OPTIONS from './data/fields';

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

export const buildQueryParams = (obj) => {
  let query = new URLSearchParams();
  Object.keys(obj).forEach(key => (
    query.append(key, obj[key])
  ));
  return query.toString();
}

export const parseFieldParams = (string, param) => {
  const value = new URLSearchParams(string).getAll(param);
  return (value[0] || "")
    .split(',')
    .filter(val => val.length)
    .reduce((acc, val) => {
      acc[val] = FIELD_OPTIONS[val];
      return acc;
    }, {});

}
