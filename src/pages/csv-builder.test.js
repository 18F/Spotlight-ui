import React from 'react';
import '@testing-library/jest-dom';
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../test-utils';
import CsvBuilder from './csv-builder';
import FIELD_OPTIONS from '../data/fields';

describe('CsvBuilder', function() {
    it('Renders the CsvBuilder with initialState', () => {
      render(<CsvBuilder />, { selectedFields: {  } });

      expect(screen.getByText(/Your Selected Fields/i)).toBeInTheDocument();
    });
    describe('when field is selected', function() {
        it('adds to list of selected fields', async () => {
            render(<CsvBuilder />, { selectedFields: {  } });

            const initial = screen.queryAllByRole('button', {
                name: 'Target Url'
            });

            expect(initial).toHaveLength(0);

            // Open the accordion
            fireEvent.click(screen.getByRole('button', {
                name: 'Website'
            }));
            const checkbox = await screen.getByRole('checkbox', {
                name: 'Target Url'
            });
            fireEvent.click(checkbox);

            const result = await screen.queryAllByRole('button', {
                name: 'Target Url'
            })
            expect(result).toHaveLength(1);
        });
    });
    describe('when field is un-checked from available fields', function() {
        it('removes button from selected fields', async () => {
            render(<CsvBuilder />, { selectedFields: {
                target_url: FIELD_OPTIONS.target_url
            } });

            const button = await screen.queryByRole('button', {
                name: 'Target Url'
            })
            expect(button).toBeInTheDocument();

            // Open the accordion
            fireEvent.click(screen.getByRole('button', {
                name: 'Website'
            }));
            const checkbox = await screen.getByRole('checkbox', {
                name: 'Target Url'
            });
            // Confirm checkbox is checked
            expect(checkbox).toBeChecked();

            // Un-check checkbox
            fireEvent.click(checkbox);

            expect(button).not.toBeInTheDocument();
        });
    });
    describe('when button is clicked from selected fields', function() {
        it('un-checks field in available fields', async () => {
            render(<CsvBuilder />, { selectedFields: {} });

            // Open accordion and check field
            fireEvent.click(screen.getByRole('button', {
                name: 'Website'
            }));
            const checkbox = await screen.getByRole('checkbox', {
                name: 'Target Url'
            });
            fireEvent.click(checkbox);

            // Button
            const button = await screen.queryByRole('button', {
                name: 'Target Url'
            })
            expect(button).toBeInTheDocument();

            expect(checkbox).toBeChecked();

            // Click button
            fireEvent.click(button);

            expect(checkbox).not.toBeChecked();
        });
    });
});