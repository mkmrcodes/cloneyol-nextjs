import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { VscTrash } from 'react-icons/vsc';
import Image from 'next/image';
import ShippingPeriod from '../../components/product/ShippingPeriod';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import QtyButtons from './QtyButtons';

const BasketItem = ({ item, pb }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className={'flex flex-col'}>
      <div
        className={
          'flex items-center text-sm border px-2 py-3 rounded-tl-sm rounded-tr-sm mr-4 mt-4'
        }
      >
        <MdCheckBox className={'w-6 h-6 text-primary mx-3'} />
        <span className={'text-gray-400'}>Satıcı:</span>
        <span className={'font-bold ml-2'}>{item.product.merchant.name}</span>
        <MdKeyboardArrowRight className={'w-5 h-5 '} />
      </div>

      <div
        className={
          'h-[100px] flex items-center text-sm border-b border-l border-r rounded-bl-sm rounded-br-sm px-2 py-3 mr-4'
        }
      >
        <div className={'flex-none'}>
          <div className={'flex items-center'}>
            <MdCheckBox className={'w-6 h-6 text-primary mx-3'} />
            <Image src={item.product.image} width={50} height={50} />
          </div>
        </div>
        <div className={'flex-grow'}>
          <div className={'flex flex-col ml-2'}>
            <div>
              <span className={'font-bold mr-1'}>
                {item.product.brand.brandName}
              </span>
              <span>{item.product.name}</span>
            </div>
            <div className={'flex items-center text-xs text-gray-500'}>
              <span className={'mr-1'}>Tahimini Teslimat Tarihi:</span>
              <ShippingPeriod shippingStart={3} maxShippingPeriod={3} />
            </div>
          </div>
        </div>
        <QtyButtons item={item} pb={pb} />
        <div className={'flex-none px-6'}>
          <div className={'flex flex-col items-center'}>
            <div className={'text-base line-through'}>
              {`${(item.product.oldPrice * item.qty).toFixed(2)} TL`}
            </div>
            <div className={'text-sm text-primary'}>
              {`${(item.product.price * item.qty).toFixed(2)} TL`}
            </div>
          </div>
        </div>
        <div
          className={'flex-none px-4 cursor-pointer'}
          onClick={() => setIsOpen(true)}
        >
          <VscTrash className={'w-6 h-6'} />
        </div>
      </div>
      <DeleteModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        item={item}
        pb={pb}
      />
    </div>
  );
};

export default BasketItem;
