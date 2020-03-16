import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('renders previous and next page buttons', () => {
    const { getByText } = render(<Pagination recordCount={500} />);
    expect(getByText('Prev')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });

  it('disables "Prev" and "1" buttons on the first page', () => {
    const { getByText, getAllByText } = render(
      <Pagination recordCount={500} />
    );
    expect(getByText('Prev').closest('button')).toHaveAttribute('disabled');
    expect(getAllByText('1')[1].closest('button')).toHaveAttribute('disabled');
  });

  it.skip('disables "Next" and "5" buttons on the last page', () => {
    // FIXME:
    // Not sure how to set this now that the current page state lives
    // inside the component rather than coming in as a prop 🤔

    const { getByText } = render(<Pagination recordCount={500} />);
    const btn5 = getByText('5');

    fireEvent.click(btn5);

    expect(getByText('Next').closest('button')).toHaveAttribute('disabled');
    expect(btn5.closest('button')).toHaveAttribute('disabled');
  });

  it('renders links to intermediate pages of records', () => {
    const { getByText, getAllByText } = render(
      <Pagination recordCount={500} />
    );
    expect(getAllByText('1')[1]).toBeInTheDocument();
    expect(getAllByText('5')[0]).toBeInTheDocument();
  });

  it('renders a select list to pick the number of results returned', () => {
    const { getByDisplayValue, getByText } = render(
      <Pagination recordCount={500} recordsPerPage="100" />
    );
    expect(getByText('records per page.')).toBeInTheDocument();
    expect(getByDisplayValue('100')).toBeVisible();
  });

  it('initiate a new query when the number of records per page changes', () => {
    const handleFilterQuery = jest.fn();
    const { getByLabelText } = render(
      <Pagination
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
