import React from 'react';
import QueryFilterSelect from './query-filter-select';

export default ({ filters }) => {
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

  const filterComponents = [];

  if (filters.includes('analysis-count'))
    filterComponents.push(
      <label key="analysisCount" htmlFor="analysisCount">
        Analysis Count
        <input
          type="text"
          name="analysisCount"
          id="analysisCount"
          data-key="data.total_score"
        />
      </label>
    );

  if (filters.includes('uswds-version'))
    filterComponents.push(
      <QueryFilterSelect
        ket="uswdsVersion"
        label="USWDS Version"
        name="uswdsversion"
        paramName="data.uswdsversion"
        optionsList={versionOptions}
      />
    );

  return <>{filterComponents.map(c => c)}</>;
};
