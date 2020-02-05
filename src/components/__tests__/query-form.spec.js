import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QueryForm from '../query-form';
import '@testing-library/jest-dom';

const scanDateList = ['2020-02-02', '2020-02-01'];

describe('QueryForm', () => {
  it('renders USWDS filters when the scantype is `uswds`', () => {
    const { getByText } = render(
      <QueryForm scanType="uswds2" scanDateList={scanDateList} />
    );

    expect(getByText('USWDS Version')).toBeInTheDocument();
  });
  it('renders privacy filters when the scantype is `privacy`', () => {
    const { getByText } = render(
      <QueryForm scanType="privacy" scanDateList={scanDateList} />
    );

    expect(getByText('Privacy Page Present')).toBeInTheDocument();
  });
});
