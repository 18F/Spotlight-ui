import React, { useReducer, createContext } from 'react';
import { merge } from 'lodash';

export const QueryContext = createContext();
export const DispatchQueryContext = createContext();

const ReportQueryProvider = ({ children }) => {
  const removeFilters = (obj, filtersToRemove) => {
    const copy = { ...obj };
    filtersToRemove.map((f) => delete copy.filters[f]);
    return copy;
  };

  const queryReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_PAGE':
        return { ...state, page: action.page };
      case 'CHANGE_RECORDS_PER_PAGE':
        return { ...state, page_size: action.pageSize };
      case 'APPLY_FILTER':
        return { ...merge(state, action.newFilter) };
      case 'REMOVE_FILTERS':
        return removeFilters({ ...state }, [...action.filtersToRemove]);
      case 'CHANGE_SCAN_DATE':
        return { ...state, scanDate: action.scanDate };
      default:
        return state;
    }
  };

  const [query, dispatchQuery] = useReducer(queryReducer, { page: 1 });

  return (
    <QueryContext.Provider value={query}>
      <DispatchQueryContext.Provider value={dispatchQuery}>
        {children}
      </DispatchQueryContext.Provider>
    </QueryContext.Provider>
  );
};

export default ReportQueryProvider;
