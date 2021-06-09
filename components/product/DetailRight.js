import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import DetailRating from './DetailRating';
import { RiShoppingBagFill } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ImHeart } from 'react-icons/im';
import { IoMdHeartEmpty } from 'react-icons/io';
import ShippingPeriod from './ShippingPeriod';
import ReturnModal from './ReturnModal';
import { BasketContext } from '../../store/BasketContext';

Modal.setAppElement('#__next');

const DetailRight = ({ product }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { addBasket } = useContext(BasketContext);
  function handleAddBasket() {
    const item = Object.assign({ qty: 1, product: product });
    //console.log(item);
    addBasket(item, localStorage._ym_uid);
  }
  return (
    <div className={'flex flex-col mt-8'}>
      <div className={'relative flex flex-col border p-4'}>
        <div className={'w-5/6'}>
          <span className={'mr-1 text-xl font-bold'}>
            {product.brand.brandName}
          </span>
          <span className={'text-xl font-bold'}>{product.name}</span>
          <DetailRating
            value={product.rating.averageRating}
            review={product.rating.ratingCount}
          />
          <div className={'flex my-3'}>
            <div
              className={
                'flex flex-col text-sm text-muted justify-center font-display'
              }
            >
              <div className={'line-through'}>{product.oldPrice} TL</div>
              {/* <div className={'line-through'}>{product.price} TL</div> */}
            </div>
            <div className={'border-l m-2'}></div>
            <div className={'flex flex-col justify-center'}>
              {/* <div className={'text-xs font-bold'}>
                Sepette %{product.promotion.promotionDiscount} İndirim
              </div> */}
              <div className={'text-2xl text-primary font-bold font-display'}>
                {product.price} TL
              </div>
            </div>
          </div>
          <div
            className={
              'w-2/4 flex items-center border border-primary rounded-3xl py-2 px-4'
            }
          >
            <span className={'px-1'}>
              <RiShoppingBagFill className={'text-primary w-6 h-6'} />
            </span>

            <span className={'font-bold'}>
              {product.promotion.promotionLabel}
            </span>
          </div>
        </div>
        {product.isCargoFree && (
          <div
            className={
              'absolute top-4 right-4 z-1 py-2 px-3 w-16 bg-white text-black font-bold text-xs border border-black rounded-sm leading-none '
            }
          >
            <span className={'block text-center'}>KARGO</span>
            <span className={'block text-center'}>BEDAVA</span>
          </div>
        )}
        {product.discountRatio && (
          <div
            className={
              'absolute top-16 right-4 z-1 py-2 px-3 w-16 bg-white text-black font-bold text-xs border border-red-600 rounded-sm leading-3 '
            }
          >
            <span
              className={
                'block text-sm text-center text-red-600 font-bold leading-3'
              }
            >
              %{product.discountRatio}
            </span>
            <span className={'block text-center text-red-600 font-bold'}>
              İndirim
            </span>
          </div>
        )}
      </div>
      <div className={'flex flex-col border-l border-r border-t p-4 mt-4'}>
        <div className={'flex items-center'}>
          <div className={'text-sm font-bold mr-1'}>Satıcı:</div>
          <div className={'text-sm font-bold text-blue-500 mr-1'}>
            {product.merchant.name}
          </div>
          <div
            className={
              'leading-4 px-1 text-sm text-white rounded-md bg-green-500 mr-1'
            }
          >
            9.5
          </div>
          <div className={'mr-1'}>
            <AiOutlineInfoCircle className={'text-primary'} />
          </div>

          <div className={'flex items-center text-primary text-sm ml-auto'}>
            <div>Mağazayı Gör</div>
            <div>
              <MdKeyboardArrowRight className={'w-5 h-5'} />
            </div>
          </div>
        </div>
      </div>
      <div className={'flex flex-col border p-4'}>
        <div className={'flex items-center mt-4'}>
          <button
            className={
              'flex-grow h-[50px] text-xl font-bold bg-primary text-white mr-4'
            }
            onClick={handleAddBasket}
          >
            Sepete Ekle
          </button>
          <button className={'flex-none h-[50px] border text-primary px-4'}>
            <ImHeart className={'w-5 h-5'} />
          </button>
        </div>
        <div className={'flex mt-4'}>
          <div className={'flex-grow font-bold text-xs mr-2'}>
            <div className={'flex items-center'}>
              <div className={'font-bold text-xs mr-1'}>
                Tahmini Teslimat Tarihi:
              </div>
              <ShippingPeriod shippingStart={3} maxShippingPeriod={14} />
            </div>
          </div>
          <div className={'flex-none text-xs text-muted'}>
            <div className={'flex items-center'}>
              <IoMdHeartEmpty className={'w-3.5 h-3.5 mr-1'} />
              <div>9999 kişinin favorisi</div>
            </div>
          </div>
        </div>
      </div>
      <div className={'flex flex-col border p-4 text-xs text-muted mt-4'}>
        <ul className={'ml-4 list-disc leading-relaxed'}>
          <li>
            30 gün içinde ücretsiz iade.Detaylı bilgi için{' '}
            <span
              className={'underline cursor-pointer'}
              onClick={() => setIsOpen(true)}
            >
              tıklayın
            </span>
          </li>
          <li>
            Bu ürün{' '}
            <span className={'font-bold text-black'}>
              {product.merchant.name}
            </span>{' '}
            tarafından gönderilecektir.
          </li>
          <li className={'font-bold text-black'}>
            İncelemiş olduğunuz ürünün satış fiyatını satıcı belirlemektedir.
          </li>
          <li>
            Omo Sık Yıkananlar Beyazlar ve Renkliler için Toz Çamaşır Deterjanı
            7.5 KG 50 Yıkama x 2
          </li>
          <li>
            Bu üründen en fazla 10 adet sipariş verilebilir. 10 adetin
            üzerindeki siparişleri iptal etme hakkını saklı tutar.
          </li>
          <li>
            Kampanya fiyatından satılmak üzere 100 adetten fazla stok
            sunulmuştur.
          </li>
          Ürün Bilgileri
        </ul>
      </div>
      <ReturnModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default DetailRight;
