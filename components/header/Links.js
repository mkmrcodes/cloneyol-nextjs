import { useContext, useState } from 'react';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { MdPerson } from 'react-icons/md';
import { MdPersonOutline } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdShoppingCart } from 'react-icons/md';
import { GiShoppingCart } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { BasketContext } from '../../store/BasketContext';

export const LoginLink = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className='relative group z-30'
      aria-haspopup='true'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href='/login'>
        <div
          className={
            'flex text-xs items-center ' + (isHover ? 'text-primary' : '')
          }
        >
          {isHover ? (
            <MdPerson className={'w-6 h-6 pr-1'} />
          ) : (
            <MdPersonOutline className={'w-6 h-6 pr-1'} />
          )}
          <span>Giriş Yap</span>
        </div>
      </Link>

      <ul
        className='w-40 hidden left-[50%] -ml-20 absolute group-hover:block border rounded-sm bg-white'
        aria-label='submenu'
      >
        <li className={'m-2 cursor-pointer bg-white'}>
          <Link href='/login'>
            <div
              className={'m-3 p-2 bg-primary text-white text-center font-bold'}
            >
              Giriş Yap
            </div>
          </Link>
        </li>
        <li className={' m-2 cursor-pointer bg-white'}>
          <Link href='/signup'>
            <div
              className={'m-3 p-2 bg-primary text-white text-center font-bold'}
            >
              Üye Ol
            </div>
          </Link>
        </li>
      </ul>
    </li>
  );
};
export const ProfileLink = () => {
  const { resetLocalBasket } = useContext(BasketContext);
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    resetLocalBasket();
    const data = await signOut({ redirect: false, callbackUrl: '/' });
    router.push(data.url);
  }

  return (
    <li
      className='relative group z-50'
      aria-haspopup='true'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href='/profile'>
        <div
          className={
            'flex text-xs items-center ' + (isHover ? 'text-primary' : '')
          }
        >
          {isHover ? (
            <MdPerson className={'w-6 h-6 pr-1'} />
          ) : (
            <MdPersonOutline className={'w-6 h-6 pr-1'} />
          )}
          <span>Hesabım</span>
        </div>
      </Link>

      <ul
        className='w-40 hidden left-[50%] -ml-20 absolute group-hover:block border rounded-sm bg-white'
        aria-label='submenu'
      >
        {/* <li className={'m-2 cursor-pointer bg-white'}>
          <Link href='/login'>
            <div
              className={'m-3 p-2 bg-primary text-white text-center font-bold'}
            >
              Siparişlerim
            </div>
          </Link>
        </li>
        <li className={' m-2 cursor-pointer bg-white'}>
          <Link href='/signup'>
            <div
              className={'m-3 p-2 bg-primary text-white text-center font-bold'}
            >
              Değerlendirmelerim
            </div>
          </Link>
        </li> */}
        <li className={' m-2 cursor-pointer bg-white'} onClick={handleLogout}>
          <div
            className={'m-3 p-2 bg-primary text-white text-center font-bold'}
          >
            Çıkış Yap
          </div>
        </li>
      </ul>
    </li>
  );
};
export const FavoritesLink = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href='/myaccount/favorites'>
        <div
          className={
            'flex text-xs items-center ' + (isHover ? 'text-primary' : '')
          }
        >
          {isHover ? (
            <MdFavorite className={'w-6 h-6 pr-1'} />
          ) : (
            <MdFavoriteBorder className={'w-6 h-6 pr-1'} />
          )}
          <span>Favorilerim</span>
        </div>
      </Link>
    </li>
  );
};
export const ShoppingCartLink = () => {
  const [isHover, setIsHover] = useState(false);
  const { basketItems } = useContext(BasketContext);
  let qty;
  if (basketItems.length !== 0) {
    qty = basketItems.map((item) => item.qty).reduce((total, x) => total + x);
  }

  return (
    <li
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href='/basket'>
        <a>
          <div
            className={
              'flex text-xs items-center ' + (isHover ? 'text-primary' : '')
            }
          >
            {isHover ? (
              <MdShoppingCart className={'w-6 h-6 pr-1'} />
            ) : (
              <GiShoppingCart className={'w-6 h-6 pr-1'} />
            )}
            <span>Sepetim</span>
            <span
              className={
                'w-4 ml-1 rounded-full text-white text-xs text-center font-bold bg-primary'
              }
            >
              {qty}
            </span>
          </div>
        </a>
      </Link>
    </li>
  );
};
export const AdminLink = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href='/admin'>
        <div
          className={
            'flex text-xs items-center ' + (isHover ? 'text-primary' : '')
          }
        >
          {isHover ? (
            <MdShoppingCart className={'w-6 h-6 pr-1'} />
          ) : (
            <GiShoppingCart className={'w-6 h-6 pr-1'} />
          )}
          <span>Admin</span>
        </div>
      </Link>
    </li>
  );
};
