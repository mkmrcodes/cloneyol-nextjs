import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { BasketContext } from '../store/BasketContext';
import BasketItem from '../components/basket/BasketItem';
import ConfirmButton from '../components/basket/ConfirmButton';
import Coupon from '../components/basket/Coupon';
import { TiShoppingCart } from 'react-icons/ti';
import { BsExclamationCircleFill } from 'react-icons/bs';
import BasketSummary from '../components/basket/BasketSummary';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import { nestApiUrl } from '../utils/constants';

const BasketPage = ({ pb }) => {
  const { updateFromLocal, updateFromDb } = useContext(BasketContext);
  let { basketItems } = useContext(BasketContext);

  //console.log('fuck');

  useEffect(() => {
    async function syncBasket(tempBasketId) {
      //get basketitems in anon basket, set basket id of them to users basketid
      //syncFromAnonDb
      const updatedBasket = await axios.get(
        `${nestApiUrl}/basket/sync/?tempBasketId=${tempBasketId}&userBasketId=${pb.id}`
      );
      updateFromDb(updatedBasket.data.items);
    }
    if (
      localStorage.basketItems !== undefined &&
      localStorage.basketItems !== []
    ) {
      console.log('updating from local');
      updateFromLocal(JSON.parse(localStorage.basketItems));
    }
    if (localStorage._ym_uid && pb) {
      syncBasket(localStorage._ym_uid);
    }
  }, []);

  let qty;
  let total;
  const router = useRouter();
  if (basketItems.length !== 0) {
    qty = basketItems.map((item) => item.qty).reduce((total, x) => total + x);
    total = basketItems
      .map((item) => parseFloat(item.product.price))
      .reduce((total, x) => total + parseFloat(x));
  }

  return (
    <div className={'w-full md:w-10/12 max-w-screen-xl mx-auto'}>
      {basketItems.length === 0 ? (
        <div className={'flex'}>
          <div className={'flex justify-center mt-4 border p-8'}>
            <div className={'w-20 h-20 relative'}>
              <TiShoppingCart
                className={
                  'absolute top-[21%] left-[18%] w-12 h-12 text-gray-600'
                }
              />
              <BsExclamationCircleFill
                className={'absolute top-[18%] left-[65%] w-4 h-4 text-primary'}
              />
            </div>
          </div>
          <div className={'w-full flex justify-between mt-4 border '}>
            <div className={'flex items-center  text-lg ml-4'}>
              Sepetinizde ürün bulunmamaktadır.
            </div>
            <button
              className={
                'text-white bg-primary text-xl font-bold rounded-sm m-12 px-16 py-0'
              }
              onClick={() => router.push('/')}
            >
              Alışverişe Başla
            </button>
          </div>
        </div>
      ) : (
        <div className={'flex mt-4'}>
          <div className={'flex-grow'}>
            <div className={'flex justify-between mr-4'}>
              <div className={'text-2xl'}>
                <span>Sepetim </span>
                <span>({qty}) Ürün</span>
              </div>
              <button
                className={'text-sm border border-black  rounded-sm py-1 px-10'}
                onClick={() => router.push('/')}
              >
                Alışverişe Devam Et
              </button>
            </div>
            {basketItems.map((item, index) => {
              return <BasketItem key={index} item={item} pb={pb} />;
            })}
          </div>
          <div className={'flex-none w-[250px]'}>
            <ConfirmButton />
            <BasketSummary />

            <Coupon />

            <ConfirmButton />
          </div>
        </div>
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  //profile basket, user basket
  let pb = null;
  const session = await getSession(context);
  if (session) {
    const res = await axios.get(
      `${nestApiUrl}/basket/profile/${session.user.id}`
    );
    pb = res.data;
  }
  return {
    props: {
      pb: pb,
    },
  };
}
export default BasketPage;
