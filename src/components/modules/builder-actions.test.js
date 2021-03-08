import React                         from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { act }                       from 'react-dom/test-utils';
import { BuilderActions }            from './builder-actions';
import FIELD_OPTIONS                 from '../../data/fields';
import { API_DOMAIN }                from '../../data/api';

describe('<BuilderActions />', function() {
    describe('when isDisabled is true', function() {

        test('it disables copy url button', async () => {
            navigator.clipboard = { writeText: jest.fn() };

            render(<BuilderActions isDisabled={true} selectedFields={{}}/>);
            const button = await screen.getByRole('button', {
                name: /Copy Url/i
            })
            expect(button).toHaveAttribute('disabled');
        });
    });
    describe('when isDisabled is false', function() {
        test('it enables copy url button', async () => {
            navigator.clipboard = { writeText: jest.fn() };

            render(<BuilderActions isDisabled={false} selectedFields={{}}/>);

            const button = await screen.getByRole('button', {
                name: /Copy Url/i
            })
            expect(button).not.toHaveAttribute('disabled');
        });
        test('it shows the API url', async () => {
            navigator.clipboard = { writeText: jest.fn() };

            render(<BuilderActions isDisabled={false} selectedFields={{}}/>);

            const apiUrl = await screen.getByText(new RegExp(API_DOMAIN, 'i'))
            expect(apiUrl).toBeInTheDocument();
        });
    });
    /* To account for browsers with no Clipboard API (IE) */
    describe('when navigator is not present', function() {
        test('hides the copy url button', async () => {
            navigator.clipboard = undefined;

            render(<BuilderActions isDisabled={false} selectedFields={{}}/>);
            const button = await screen.queryByRole('button', {
                name: /Copy Url/i
            })
            expect(button).not.toBeInTheDocument();
        });
    });
    describe('when copied button is clicked', function() {
        test('shows a success message', async () => {
            navigator.clipboard = {
                writeText: jest.fn(() => Promise.resolve())
            };

            render(<BuilderActions isDisabled={false} selectedFields={{}}/>);

            const button = await screen.getByRole('button', {
                name: /Copy Url/i
            });

            await act(async () => {
                fireEvent.click(button);
            });

            const msg = await screen.getByText(/Copied/i);

            expect(msg).toBeInTheDocument();
        });
    });
})
