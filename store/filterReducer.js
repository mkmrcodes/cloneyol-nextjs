import filterTypes from './filter.types';
import { deleteFromFilters } from './filterUtils';

export const FILTER_INITIAL_STATE = {
  filters: {
    categories: [],
    brands: [],
  },
  search: {
    wb: '',
    wc: '',
  },
};

export function filterReducer(state, action) {
  switch (action.type) {
    case filterTypes.GET_STORE:
      return {
        ...state,
        search: {
          wc: [...state.search.wb],
          wb: [...state.search.wc],
        },
      };
    case filterTypes.UPDATE_SEARCH: {
      return {
        ...state,
        search: {
          wc: action.payload.wc,
          wb: action.payload.wb,
        },
      };
    }
    case filterTypes.ADD_CATEGORY: {
      return {
        ...state,
        filters: {
          categories: [...state.filters.categories, action.payload],
          brands: [...state.filters.brands],
        },
      };
    }
    case filterTypes.UPDATE_CATEGORY: {
      return {
        ...state,
        filters: {
          categories: [action.payload],
          brands: [...state.filters.brands],
        },
      };
    }
    case filterTypes.ADD_BRAND: {
      return {
        ...state,
        filters: {
          categories: [...state.filters.categories],
          brands: [...state.filters.brands, action.payload],
        },
      };
    }
    case filterTypes.UPDATE_BRAND: {
      return {
        ...state,
        filters: {
          categories: [...state.filters.categories],
          brands: [action.payload],
        },
      };
    }

    case filterTypes.REMOVE_CATEGORY: {
      if (
        !Array.isArray(state.filters.categories) ||
        state.filters.categories === []
      )
        return;
      const newCategories = deleteFromFilters(
        action.payload,
        state.filters.categories
      );
      return {
        ...state,
        filters: {
          categories: [...newCategories],
          brands: [...state.filters.brands],
        },
      };
    }
    case filterTypes.REMOVE_BRAND: {
      if (!Array.isArray(state.filters.brands) || state.filters.brands === [])
        return;
      const newBrands = deleteFromFilters(action.payload, state.filters.brands);
      return {
        ...state,
        filters: {
          categories: [...state.filters.categories],
          brands: [...newBrands],
        },
      };
    }
    default:
      return state;
  }
}
