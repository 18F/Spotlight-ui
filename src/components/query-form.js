import React from 'react';

export default ({
  scanDateList,
  domainTypeList,
  agencies,
  handleFilterQuery,
  handleScanDateChange,
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

  const privacyQueryTypes = {
    '200': 'Present',
    '!(200)': 'Not Present',
    '*': 'All',
  };

  const privacyQueryOptions = Object.entries(
    privacyQueryTypes
  ).map(queryType => <option value={queryType[0]}>{queryType[1]}</option>);

  return (
    <form>
      <fieldset>
        <legend>Filter results</legend>

        <QueryFilterSelect
          label="Privacy Page Present"
          name="privacyPagePresent"
          onChange={e =>
            handleFilterQuery({ data: { status_code: e.target.value } })
          }
          optionsList={privacyQueryOptions}
        />

        <QueryFilterSelect
          label="Filter by agency"
          name="agency"
          onChange={e => handleFilterQuery({ agency: e.target.value })}
          optionsList={agencyOptions}
        />

        <QueryFilterSelect
          label="Filter by agency type"
          name="domainTypes"
          onChange={e => handleFilterQuery({ domaintype: e.target.value })}
          optionsList={domainTypeOptions}
        />

        <QueryFilterSelect
          label="Filter by Scan Date"
          name="scanDate"
          onChange={e => handleScanDateChange(e.target.value)}
          optionsList={scanDateOptions}
        />
      </fieldset>
    </form>
  );
};

const QueryFilterSelect = ({ label, name, onChange, optionsList }) => {
  /* TODO: add `value` prop after passing in and destructuring queryParams from Scan to set initial values based on the last query */

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} onChange={onChange}>
        {optionsList}
      </select>
    </>
  );
};
