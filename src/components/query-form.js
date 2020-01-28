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

  agencies = addOptionAll(agencies).map(a => {
    const value = a === `All` ? `*` : a.replace(/ /g, '+');
    return (
      <option key={a} value={value}>
        {a}
      </option>
    );
  });

  domainTypeList = addOptionAll(domainTypeList).map(domain => {
    const value = domain === `All` ? `*` : domain.split('-')[1].trim();
    return (
      <option key={domain} value={value}>
        {domain}
      </option>
    );
  });

  return (
    <form>
      <fieldset>
        <label htmlFor="privacyPagePresent">Privacy Page Present</label>
        <select
          id="privacyPagePresent"
          name="privacyPagePresent"
          onChange={e =>
            handleFilterQuery({ data: { status_code: e.target.value } })
          }
        >
          <option value="200">Present</option>
          <option value="!(200)">Not Present</option>
          <option value="*">All</option>
        </select>

        <label htmlFor="agencies">Filter by agency</label>
        <select
          id="agencies"
          name="agencies"
          onChange={e => handleFilterQuery({ agency: e.target.value })}
        >
          {agencies}
        </select>

        <label htmlFor="domainTypes">Filter by agency type</label>
        <select
          name="domainTypes"
          id="domainTypes"
          onChange={e => handleFilterQuery({ domaintype: e.target.value })}
        >
          {domainTypeList}
        </select>

        <label htmlFor="scanDate">Filter by Scan Date</label>
        <select
          name="scanDate"
          id="scanDate"
          onChange={e => handleScanDateChange(e.target.value)}
        >
          {scanDateList.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </fieldset>
    </form>
  );
};
