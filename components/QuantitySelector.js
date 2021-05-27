import { useState } from 'react';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  function increment() {
    setQuantity(quantity + 1);
  }
  function decrement() {
    setQuantity(quantity - 1);
  }
  return (
    <div>
      <div className={'flex items-center justify-center'}>
        <button className={'bg-red-600 py-1 px-4'} onClick={decrement}>
          -
        </button>
        <p className={'px-2'}>{quantity}</p>
        <button className={'bg-red-600 py-1 px-4'} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
