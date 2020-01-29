import React from 'react';
import { render } from '@testing-library/react';
import Pagination from '../pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('renders previous and next page buttons', () => {
    const { getByText } = render(<Pagination currentPageNumber="1" />);
    expect(getByText('Prev')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });
  it('disables "Prev"/"Next" buttons on the first/last page', () => {
    const { debug, getByText } = render(
      <Pagination currentPageNumber={1} onClick={() => false} />
    );
    expect(getByText('Prev').closest('button')).toHaveAttribute('disabled');
  });
});
