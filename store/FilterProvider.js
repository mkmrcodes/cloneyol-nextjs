import { useReducer } from 'react';
import { FilterContext } from './FilterContext';
import { filterReducer, FILTER_INITIAL_STATE } from './filterReducer';
import filterTypes from './filter.types';

export function FilterProvider({ children }) {
  const [store, dispatch] = useReducer(filterReducer, FILTER_INITIAL_STATE);
  const { filters, search } = store;
  const getStore = () => {
    dispatch({
      type: filterTypes.GET_STORE,
    });
  };
  const updateSearch = (search) => {
    dispatch({
      type: filterTypes.UPDATE_SEARCH,
      payload: search,
    });
  };
  const addCategory = (filter) => {
    dispatch({
      type: filterTypes.ADD_CATEGORY,
      payload: filter,
    });
  };
  const updateCategory = (filter) => {
    dispatch({
      type: filterTypes.UPDATE_CATEGORY,
      payload: filter,
    });
  };
  const removeCategory = (filter) => {
    dispatch({
      type: filterTypes.REMOVE_CATEGORY,
      payload: filter,
    });
  };
  const addBrand = (filter) => {
    dispatch({
      type: filterTypes.ADD_BRAND,
      payload: filter,
    });
  };
  const updateBrand = (filter) => {
    dispatch({
      type: filterTypes.UPDATE_BRAND,
      payload: filter,
    });
  };
  const removeBrand = (filter) => {
    dispatch({
      type: filterTypes.REMOVE_BRAND,
      payload: filter,
    });
  };
  return (
    <FilterContext.Provider
      value={{
        filters,
        search,
        updateSearch,
        addCategory,
        updateCategory,
        removeCategory,
        addBrand,
        updateBrand,
        removeBrand,
        getStore,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
