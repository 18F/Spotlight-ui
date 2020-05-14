import React from 'react';

export default ({ type, heading, message }) => {
  return (
    <div
      class={`usa-alert usa-alert--${type}`}
      role="alert"
      data-testid={`alert-${type}`}
    >
      <div class="usa-alert__body">
        <h3 class="usa-alert__heading">{heading}</h3>
        <p class="usa-alert__text">{message}</p>
      </div>
    </div>
  );
};
