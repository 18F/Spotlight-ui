import React from 'react';
import { render } from '@testing-library/react';
import Pagination from '../pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('renders previous and next page buttons', () => {
    const { getByText } = render(
      <Pagination currentPage="1" recordCount={500} />
    );
    expect(getByText('Prev')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });

  it('disables "Prev" and "1" buttons on the first page', () => {
    const { debug, getByText } = render(
      <Pagination currentPage={1} recordCount={500} />
    );
    expect(getByText('Prev').closest('button')).toHaveAttribute('disabled');
    expect(getByText('1').closest('button')).toHaveAttribute('disabled');
  });

  it('disables "Next" and "5" buttons on the last page', () => {
    const { debug, getByText } = render(
      <Pagination currentPage={5} recordCount={500} />
    );
    expect(getByText('Next').closest('button')).toHaveAttribute('disabled');
    expect(getByText('5').closest('button')).toHaveAttribute('disabled');
  });

  it('renders links to intermediate pages of records', () => {
    const { debug, getByText } = render(
      <Pagination currentPageNumber={1} recordCount={500} />
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });
});
