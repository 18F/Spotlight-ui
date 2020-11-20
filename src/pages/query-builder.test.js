import React from 'react';
import '@testing-library/jest-dom';
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../test-utils';
import QueryBuilder from './query-builder';
import FIELD_OPTIONS from '../data/fields';

describe('QueryBuilder', function() {
    it('Renders the QueryBuilder with initialState', () => {
      render(<QueryBuilder />, { selectedFields: {  } });

      expect(screen.getByText(/Your Selections/i)).toBeInTheDocument();
    });
    // describe('when field is selected', function() {
    //     it('adds to list of selected fields', async () => {
    //         render(<QueryBuilder />, { selectedFields: {  } });

    //         const initial = screen.queryAllByRole('button', {
    //             name: 'Target Url'
    //         });

    //         expect(initial).toHaveLength(0);

    //         // Open the accordion and select field
    //         fireEvent.click(screen.getByRole('button', {
    //             name: 'Website'
    //         }));
    //         const checkbox = await screen.getByRole('checkbox', {
    //             name: 'Target Url'
    //         });
    //         fireEvent.click(checkbox);

    //         // check for button in selections
    //         const button = await screen.queryByRole('button', {
    //             name: 'Target Url'
    //         })
    //         expect(button).toBeInTheDocument();
    //     });
    // });
    // describe('when field is un-checked from available fields', function() {
    //     it('removes button from selected fields', async () => {
    //         render(<QueryBuilder />, { selectedFields: {
    //             target_url: FIELD_OPTIONS.target_url
    //         } });

    //         const button = await screen.queryByRole('button', {
    //             name: 'Target Url'
    //         })
    //         expect(button).toBeInTheDocument();

    //         // Open the accordion
    //         fireEvent.click(screen.getByRole('button', {
    //             name: 'Website'
    //         }));
    //         const checkbox = await screen.getByRole('checkbox', {
    //             name: 'Target Url'
    //         });
    //         // Confirm checkbox is checked
    //         expect(checkbox).toBeChecked();

    //         // Un-check checkbox
    //         fireEvent.click(checkbox);

    //         expect(button).not.toBeInTheDocument();
    //     });
    // });
    // describe('when button is clicked from selected fields', function() {
    //     it('un-checks field in available fields', async () => {
    //         render(<QueryBuilder />, { selectedFields: {} });

    //         // Open accordion and check field
    //         fireEvent.click(screen.getByRole('button', {
    //             name: 'Website'
    //         }));
    //         const checkbox = await screen.getByRole('checkbox', {
    //             name: 'Target Url'
    //         });
    //         fireEvent.click(checkbox);

    //         // Button
    //         const button = await screen.queryByRole('button', {
    //             name: 'Target Url'
    //         })
    //         expect(button).toBeInTheDocument();

    //         expect(checkbox).toBeChecked();

    //         // Click button
    //         fireEvent.click(button);

    //         expect(checkbox).not.toBeChecked();
    //     });
    // });
    // describe('when a field is filterable by text', function() {
    //     it('displays text input when field is checked and adds value to selection button', async () => {
    //         render(<QueryBuilder />, { selectedFields: {} });

    //         // Open accordion and check field
    //         fireEvent.click(screen.getByRole('button', {
    //             name: 'Website'
    //         }));
    //         const checkbox = await screen.getByRole('checkbox', {
    //             name: 'Target Url'
    //         });
    //         fireEvent.click(checkbox);

    //         const input = await screen.queryByPlaceholderText('Filter by Target Url')

    //         expect(input).toBeInTheDocument();

    //         fireEvent.change(input, { target: { value: 'foo' } });

    //         // selection button
    //         const buttonWithFilter = await screen.queryByText(/foo/i)

    //         expect(buttonWithFilter).toBeInTheDocument();

    //     });
    // });
});
