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
