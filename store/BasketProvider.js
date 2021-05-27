import axios from 'axios';
import { useReducer } from 'react';
import basketTypes from './basket.types';
import { BasketContext } from './BasketContext';
import { basketReducer, BASKET_INITIAL_STATE } from './basketReducer';

export function BasketProvider({ children }) {
  // console.log('basketInitials: ', basketInitials);
  // let BASKET_INITIAL_STATE = {
  //   basketItems: [],
  // };
  // if (basketInitials !== undefined) {
  //   BASKET_INITIAL_STATE = basketInitials;
  // }
  const [store, dispatch] = useReducer(basketReducer, BASKET_INITIAL_STATE);
  const { basketItems } = store;

  async function addDbBasket(itemId, basketId) {
    await axios.post('http://localhost:3001/api/basketitem/', {
      basket: basketId,
      product: itemId,
      qty: 1,
    });
  }
  async function decrementQtyDbBasket(itemId, basketId) {
    await axios.get(
      `http://localhost:3001/api/basketitem/decqty/?basket=${basketId}&item=${itemId}`
    );
  }
  async function incrementQtyDbBasket(itemId, basketId) {
    await axios.get(
      `http://localhost:3001/api/basketitem/incqty/?basket=${basketId}&item=${itemId}`
    );
  }
  async function removeDbBasketItem(itemId, basketId) {
    await axios.get(
      `http://localhost:3001/api/basketitem/remove/?basket=${basketId}&item=${itemId}`
    );
  }

  const addBasket = async (product, basketId) => {
    await addDbBasket(product.product.id, basketId);
    dispatch({
      type: basketTypes.ADD_BASKET,
      payload: product,
    });
  };
  const removeBasket = async (product, basketId) => {
    await removeDbBasketItem(product.product.id, basketId);
    dispatch({
      type: basketTypes.REMOVE_BASKET,
      payload: product,
    });
  };
  const decrementQty = async (basketItem, basketId) => {
    await decrementQtyDbBasket(basketItem.product.id, basketId);
    dispatch({
      type: basketTypes.DECREMENT_QTY,
      payload: basketItem,
    });
  };
  const incrementQty = async (basketItem, basketId) => {
    await incrementQtyDbBasket(basketItem.product.id, basketId);
    dispatch({
      type: basketTypes.INCREMENT_QTY,
      payload: basketItem,
    });
  };
  const updateFromLocal = (basketItems) => {
    dispatch({
      type: basketTypes.UPDATE_BASKET_FROM_LOCALSTORAGE,
      payload: basketItems,
    });
  };
  const updateFromDb = (basketItems) => {
    dispatch({
      type: basketTypes.UPDATE_BASKET_FROM_DB,
      payload: basketItems,
    });
  };
  const resetLocalBasket = () => {
    console.log('rresetting local basket');
    dispatch({
      type: basketTypes.RESET_LOCAL_BASKET,
    });
  };

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addBasket,
        removeBasket,
        decrementQty,
        incrementQty,
        updateFromLocal,
        updateFromDb,
        resetLocalBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
