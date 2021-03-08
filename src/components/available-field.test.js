import React                         from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { act }                       from 'react-dom/test-utils';
import { AvailableField }            from './available-field.js';
import FIELD_OPTIONS                 from '../data/fields';

describe('<AvailableField />', function() {
    describe('when field has input type text', function() {

        test('renders a text input', async () => {
            render(<AvailableField
                field={FIELD_OPTIONS['target_url']}
                value={''}
                onFieldChange={jest.fn()}
            />);
            const input = await screen.getByLabelText(/Target Url/i, {
                selector: 'input'
            });
            expect(input).toBeInTheDocument();
        });
    });
    describe('when field has input type select', function() {

        test('renders a select menu', async () => {
            render(<AvailableField
                field={FIELD_OPTIONS['final_url_live']}
                value={''}
                onFieldChange={jest.fn()}
            />);
            const input = await screen.getByLabelText(/Final Url is Live/i, {
                selector: 'select'
            });
            expect(input).toBeInTheDocument();
        });
    });
    describe('when passed a value', function() {

        test('sets input value for text input', async () => {
            render(<AvailableField
                field={FIELD_OPTIONS['target_url']}
                value={'foo'}
                onFieldChange={jest.fn()}
            />);
            const input = await screen.getByLabelText(/Target Url/i, {
                selector: 'input'
            });
            expect(input.value).toEqual('foo');
        });
        test('sets input value for select input', async () => {
            render(<AvailableField
                field={FIELD_OPTIONS['final_url_live']}
                value={'true'}
                onFieldChange={jest.fn()}
            />);
            const input = await screen.getByLabelText(/Final Url is Live/i, {
                selector: 'select'
            });
            expect(input.value).toEqual('true');
        });
    });
    describe('when input value changes', function() {
        test('calls onFieldChange prop for text input', async () => {
            const mockFn = jest.fn();
            render(<AvailableField
                field={FIELD_OPTIONS['target_url']}
                value={'foo'}
                onFieldChange={mockFn}
            />);
            const input = await screen.getByLabelText(/Target Url/i, {
                selector: 'input'
            });
            fireEvent.change(input, { target: { value: 'bar' } })

            expect(mockFn.mock.calls.length).toBe(1);
        });
        test('calls onFieldChange prop for select input', async () => {
            const mockFn = jest.fn();
            render(<AvailableField
                field={FIELD_OPTIONS['final_url_live']}
                value={'true'}
                onFieldChange={mockFn}
            />);
            const input = await screen.getByLabelText(/Final Url is Live/i, {
                selector: 'select'
            });
            fireEvent.change(input, { target: { value: 'false' } })

            expect(mockFn.mock.calls.length).toBe(1);
        });
    });
});
