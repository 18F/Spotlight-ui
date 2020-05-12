import React from 'react';

export default ({ heading, message }) => {
  return (
    <div
      class="usa-alert usa-alert--error"
      role="alert"
      data-testid="error-alert"
    >
      <div class="usa-alert__body">
        <h3 class="usa-alert__heading">{heading}</h3>
        <p class="usa-alert__text">{message}</p>
      </div>
    </div>
  );
};
