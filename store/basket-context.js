import { createContext, useState } from 'react';

const BasketContext1 = createContext({
  products: [],
  totalProducts: 0,
  addProduct: (product) => {},
  removeProduct: (productId) => {},
});

export function BasketContextProvider(props) {
  const [userProducts, setUserProducts] = useState([]);

  function addProductHandler(product) {
    setUserProducts((prevUserProducts) => {
      return prevUserProducts.concat(product);
    });
  }
  function removeProductHandler(productId) {
    setUserProducts((prevUserProducts) => {
      return prevUserProducts.filter((product) => product.id !== productId);
    });
  }

  const context = {
    products: userProducts,
    totalProducts: userProducts.length,
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
  };
  return (
    <BasketContext.Provider value={context}>
      {props.children}
    </BasketContext.Provider>
  );
}

export default BasketContext1;
