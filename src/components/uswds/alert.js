import React from 'react';

export default ({ type, heading, message, children }) => {
  return (
    <div
      className={`usa-alert usa-alert--${type}`}
      role="alert"
      data-testid={`alert-${type}`}
    >
      <div className="usa-alert__body">
        <h3 className="usa-alert__heading">{heading}</h3>
        <p className="usa-alert__text">{message || children}</p>
      </div>
    </div>
  );
};
