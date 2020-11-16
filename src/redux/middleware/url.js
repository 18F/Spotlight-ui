import * as selectedFields from '../ducks/selectedFields';
import * as utils          from '../../utils';

const urlMiddleware = store => next => action => {
    let result = next(action);

    switch (action.type) {
        case selectedFields.SELECT_FIELD:
        case selectedFields.SET_FIELD_VALUE:
        case selectedFields.UNSELECT_FIELD:
            const paramString = utils.buildQueryParams(
                utils.deepPluck(store.getState().selectedFields, 'value')
            );
            typeof window !== 'undefined' &&
                window.history.replaceState(null, "", `?${paramString}`);
            break;
        default:
            break;
    }
    return result;
}

export default urlMiddleware;
