import { useContext } from 'react';
import { BasketContext } from '../../store/BasketContext';

const QtyButtons = ({ item, pb }) => {
  const { decrementQty, incrementQty } = useContext(BasketContext);
  function handleDecrement() {
    item.qty = item.qty - 1;
    if (pb) {
      decrementQty(item, pb.id);
    } else {
      decrementQty(item, localStorage._ym_uid);
    }
  }
  function handleIncrement() {
    item.qty = item.qty + 1;
    if (pb) {
      incrementQty(item, pb.id);
    } else {
      incrementQty(item, localStorage._ym_uid);
    }
  }
  return (
    <div className={'flex-none px-6'}>
      <div className={'flex'}>
        <button
          className={'text-sm text-primary border p-2 disabled:text-white'}
          disabled={item.qty === 1}
          onClick={() => handleDecrement()}
        >
          -
        </button>
        <div className={'border-t border-b py-2 px-4'}>{item.qty}</div>
        <button
          className={'text-sm text-primary border p-2 disabled:text-white'}
          disabled={item.qty === 10}
          onClick={() => handleIncrement()}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QtyButtons;
