import React from 'react';
export default ({ label, name, paramName, optionsList }) => {
  /* TODO: add `value` prop after passing in and destructuring queryParams from Scan to set initial values based on the last query */

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} data-key={paramName}>
        {optionsList}
      </select>
    </>
  );
};
