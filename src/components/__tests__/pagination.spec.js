import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { getByText } = render(
      <Pagination currentPage={1} recordCount={500} />
    );
    expect(getByText('Prev').closest('button')).toHaveAttribute('disabled');
    expect(getByText('1').closest('button')).toHaveAttribute('disabled');
  });

  it('disables "Next" and "5" buttons on the last page', () => {
    const { getByText } = render(
      <Pagination currentPage={5} recordCount={500} />
    );
    expect(getByText('Next').closest('button')).toHaveAttribute('disabled');
    expect(getByText('5').closest('button')).toHaveAttribute('disabled');
  });

  it('renders links to intermediate pages of records', () => {
    const { getByText } = render(
      <Pagination currentPageNumber={1} recordCount={500} />
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });

  it('renders a select list to pick the number of results returned', () => {
    const { getByDisplayValue, getByText } = render(
      <Pagination
        currentPageNumber={1}
        recordCount={500}
        recordsPerPage="100"
      />
    );
    expect(getByText('records per page.')).toBeInTheDocument();
    expect(getByDisplayValue('100')).toBeVisible();
  });

  it('initiate a new query when the number of records per page changes', () => {
    const handleFilterQuery = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        currentPageNumber={1}
        recordCount={500}
        recordsPerPage="100"
        handleFilterQuery={handleFilterQuery}
      />
    );

    fireEvent.change(getByLabelText('records per page.'), {
      target: { value: 20 },
    });

    expect(handleFilterQuery).toHaveBeenCalledWith({ page_size: '20' });
  });
});
