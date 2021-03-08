import { omit } from 'lodash';
import { parseFieldParams } from '../../utils';
// Actions
export const SELECT_FIELD = 'SELECT_FIELD';
export const UNSELECT_FIELD = 'UNSELECT_FIELD';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';

// Action Creators
export const selectField = (payload) => ({
    type: SELECT_FIELD,
    payload,
});

export const unselectField = (payload) => ({
    type: UNSELECT_FIELD,
    payload,
});

export const setFieldValue = (payload) => ({
    type: SET_FIELD_VALUE,
    payload,
});

// Reducer
export const emptyState = {}
export const initialState = typeof window !== `undefined` && window.location.search.length ? parseFieldParams(window.location.search) : emptyState;

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
    case SET_FIELD_VALUE:
        return {
            ...state,
            [action.payload.attribute]: {
                ...state[action.payload.attribute],
                ...action.payload,
            }
        }
    default:
        return state
    }
};
