import { useContext, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { BasketContext } from '../../store/BasketContext';

const BasketButtons = (product) => {
  const { addBasket } = useContext(BasketContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddedBasket, setIsAddedBasket] = useState(false);
  const [showBasket, setshowBasket] = useState(false);
  function handleAddBasket() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAddedBasket(true);
      setTimeout(() => {
        setIsAddedBasket(false);
      }, 2000);
    }, 1000);
    if (setIsAddedBasket) {
      setshowBasket(true);
      setTimeout(() => {
        setshowBasket(false);
      }, 3000);
    }
    const item = Object.assign({ qty: 1 }, product);
    //console.log(item);
    addBasket(item, localStorage._ym_uid);
  }
  return (
    <div className={'w-[215px] mx-auto'}>
      <button
        className={
          'absolute w-[215px] h-8 mt-2 bg-primary text-white text-sm font-bold rounded-sm inline-flex justify-center items-center tracking-wide opacity-1 z-0 focus:outline-none active:outline-none ' +
          (showBasket ? 'opacity-100 z-2 button-success-animation' : '')
        }
      >
        <div className={'flex focus:outline-none active:outline-none'}>
          <MdShoppingCart className={'w-5 h-5 mr-2'} /> <span>Sepete Git</span>
        </div>
      </button>
      <button
        className={
          'relative w-[215px] z-2 focus:outline-none active:outline-none'
        }
        onClick={handleAddBasket}
      >
        <div
          className={
            'btn-primary-outline button-animation ' +
            (isLoading || isAddedBasket ? 'hidden' : '')
          }
        >
          Sepete Ekle
        </div>
        <div className={'btn-success ' + (!isAddedBasket ? 'hidden' : '')}>
          Sepete Eklendi
        </div>

        <div className={'btn-loading ' + (!isLoading ? 'hidden' : '')}>
          <div
            className={
              'border-solid animate-spin rounded-full border-white border-2 h-4 w-4'
            }
            style={{ borderTopColor: 'transparent' }}
          ></div>
        </div>
      </button>
    </div>
  );
};

export default BasketButtons;
