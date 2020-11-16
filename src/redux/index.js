import {
    createStore, combineReducers, applyMiddleware, compose,
}                            from 'redux';
import selectedFields        from './ducks/selectedFields';
import urlMiddleware         from './middleware/url';

// Reducers
export const rootReducer = combineReducers({
    selectedFields,
});

// Enhancers
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development' &&
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

// Middleware
const middleware = [
    urlMiddleware,
]

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware),
));

export default store;
