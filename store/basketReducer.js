import basketTypes from './basket.types';
import { deleteFromFilters } from './filterUtils';

export const BASKET_INITIAL_STATE = {
  basketItems: [],
};

export function basketReducer(state, action) {
  let newBasket;
  switch (action.type) {
    case basketTypes.ADD_BASKET:
      //if item is in basket increment its qty
      let item2Update = state.basketItems.filter(
        (item) => item.product.id === action.payload.product.id
      )[0];
      if (item2Update !== undefined) {
        item2Update.qty = item2Update.qty + 1;
        let removed = state.basketItems.filter(
          (item) => item.product.id !== action.payload.product.id
        );
        newBasket = [...removed, item2Update].sort((a, b) =>
          a.product.code > b.product.code ? 1 : -1
        );
        localStorage.setItem('basketItems', JSON.stringify(newBasket));
        return {
          ...state,
          basketItems: newBasket,
        };
      }
      newBasket = [...state.basketItems, action.payload].sort((a, b) =>
        a.product.code > b.product.code ? 1 : -1
      );
      localStorage.setItem('basketItems', JSON.stringify(newBasket));
      return {
        ...state,
        basketItems: newBasket,
      };

    case basketTypes.REMOVE_BASKET:
      newBasket = state.basketItems
        .filter((item) => item.product.id !== action.payload.product.id)
        .sort((a, b) => (a.product.code > b.product.code ? 1 : -1));
      localStorage.setItem('basketItems', JSON.stringify(newBasket));
      return {
        ...state,
        basketItems: newBasket,
      };
    case basketTypes.DECREMENT_QTY:
      let filteredBasket = state.basketItems.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      newBasket = [...filteredBasket, action.payload].sort((a, b) =>
        a.product.code > b.product.code ? 1 : -1
      );
      localStorage.setItem('basketItems', JSON.stringify(newBasket));
      return {
        ...state,
        basketItems: newBasket,
      };
    case basketTypes.INCREMENT_QTY:
      let x = state.basketItems.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      newBasket = [...x, action.payload].sort((a, b) =>
        a.product.code > b.product.code ? 1 : -1
      );
      localStorage.setItem('basketItems', JSON.stringify(newBasket));
      return {
        ...state,
        basketItems: newBasket,
      };
    case basketTypes.UPDATE_BASKET_FROM_LOCALSTORAGE:
      newBasket = [...action.payload].sort((a, b) =>
        a.product.code > b.product.code ? 1 : -1
      );
      return {
        ...state,
        basketItems: newBasket,
      };
    case basketTypes.UPDATE_BASKET_FROM_DB:
      // if (action.payload === []) return state;
      newBasket = [...action.payload].sort((a, b) =>
        a.product.code > b.product.code ? 1 : -1
      );
      return {
        ...state,
        basketItems: newBasket,
      };
    case basketTypes.RESET_LOCAL_BASKET:
      localStorage.setItem('basketItems', '[]');
      return {
        ...state,
        basketItems: [],
      };

    default:
      return state;
  }
}
