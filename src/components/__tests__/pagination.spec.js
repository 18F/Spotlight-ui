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
    expect(getByText('Prev').closest('span')).toHaveClass('disabled');
    expect(getAllByText('1')[1].closest('span')).toHaveAttribute(
      'aria-current'
    );
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
    const { getAllByText } = render(<Pagination recordCount={500} />);
    expect(getAllByText('1')[1]).toBeInTheDocument();
    expect(getAllByText('5')[0]).toBeInTheDocument();
  });

  it('renders links to skip to the beginning & end of the list', () => {
    const { getAllByText } = render(<Pagination recordCount={500} />);
    expect(getAllByText('1')[0].closest('li')).toHaveClass('firstPage');
    expect(getAllByText('5')[1].closest('li')).toHaveClass('lastPage');
  });
});
