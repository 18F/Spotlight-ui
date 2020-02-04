import React from 'react';
import QueryFilterSelect from './query-filter-select';

export default () => {
  const versions = [
    '',
    0,
    'v2.3.1',
    'v2.0.3',
    'v1.1.0',
    'v1.4.1',
    'v1.6.3',
    'v2.2.1',
    'v0.14.0',
  ];

  const versionOptions = versions.map(v => (
    <option key={v} value={v}>
      {v}
    </option>
  ));

  return (
    <>
      <label htmlFor="analysisCount">Analysis Count</label>
      <input
        type="text"
        name="analysisCount"
        id="analysisCount"
        data-key="data.total_score"
      />

      <QueryFilterSelect
        label="USWDS Version"
        name="uswdsversion"
        paramName="data.uswdsversion"
        optionsList={versionOptions}
      />
    </>
  );
};
