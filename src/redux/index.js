import { createStore, combineReducers } from 'redux';
import selectedFields from './ducks/selectedFields';

export const rootReducer = combineReducers({
  selectedFields,
})

const store = createStore(
    rootReducer,
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
