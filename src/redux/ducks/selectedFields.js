import { omit } from 'lodash';
import { parseFieldParams } from '../../utils';
// Actions
export const SELECT_FIELD = 'SELECT_FIELD';
export const UNSELECT_FIELD = 'UNSELECT_FIELD';

// Action Creators
export const selectField = (payload) => ({
    type: SELECT_FIELD,
    payload
});

export const unselectField = (payload) => ({
    type: UNSELECT_FIELD,
    payload
});

// Reducer
export const emptyState = {}
export const initialState = window && window.location.search.length ? parseFieldParams(window.location.search, 'fields') : emptyState;

export default (state = initialState, action) => {
    switch (action.type) {
    case SELECT_FIELD:
        return {
            [action.payload.attribute]: action.payload,
            ...state,
        }
    case UNSELECT_FIELD:
        return {
            ...omit(state, [action.payload.attribute])
        }
    default:
        return state
    }
};
