import selectedFieldsReducer, * as ducks from './selectedFields';

describe('selectedFields Reducer', () => {
    test('adds a selected field to state', function() {
        const payload = {
            category: 'Website',
            attribute: 'target_url',
            title: 'Target URL'
        };
        const action = ducks.selectField(payload);
        const result = selectedFieldsReducer(ducks.initialState, action);
        expect(result.target_url).toBe(payload);
    });
    test('removes a selected field from state', function() {
        const payload = {
            category: 'Website',
            attribute: 'target_url',
            title: 'Target URL'
        };
        const action = ducks.unselectField(payload);
        const state = {
            ...ducks.initialState,
            target_url: payload,
            another_field: { foo: 'bar' }
        }
        const result = selectedFieldsReducer(state, action)
        expect(result.target_url).toBe(undefined);
    });
    test('updates specific field value', function() {
        const payload = {
            attribute: 'target_url',
            value: 'example.com',
        }
        const action = ducks.setFieldValue(payload);
        const state = {
            ...ducks.initialState,
            target_url: {
                category: 'Website',
            }
        }
        const result = selectedFieldsReducer(state, action)
        expect(result.target_url).toEqual({
            category: 'Website',
            attribute: 'target_url',
            value: 'example.com',
        });
    })
});
