import { useContext, useEffect } from 'react';
import { BasketContext } from '../../store/BasketContext';

const BasketSummary = () => {
  const { basketItems } = useContext(BasketContext);
  //let items = basketItems;
  // useEffect(() => {
  //   items = basketItems;
  // }, [basketItems]);

  let qty;
  let total;
  if (basketItems.length !== 0) {
    qty = basketItems.map((item) => item.qty).reduce((total, x) => total + x);
    total = basketItems
      .map((item) => parseFloat((item.product.price * item.qty).toFixed(2)))
      .reduce((total, x) => total + parseFloat(x));
  }
  return (
    <div className={'flex flex-col border my-4 px-4'}>
      <div className={'text-2xl mt-6 mb-3'}>Sipariş Özeti</div>
      <div className={'flex justify-between'}>
        <div className={'text-sm mb-2'}>Ürün Toplamı</div>
        <div>{`${total.toFixed(2)} TL`}</div>
      </div>
      <div className={'flex justify-between'}>
        <div className={'text-sm'}>Kargo Toplam</div>
        <div>9.90 TL</div>
      </div>
      <div className={'text-xs text-gray-400'}>
        Kargo ücreti ödememeniz için sepetinizdeki tüm ürünlerin “Kargo Bedava”
        olması gerekmektedir.
      </div>
      <div className='border-b border-gray-300 my-4 ' />
      <div className={'text-xl text-primary text-right font-bold mb-4'}>
        {(total + 9.9).toFixed(2)} TL
      </div>
    </div>
  );
};

export default BasketSummary;
