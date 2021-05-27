import Image from 'next/image';
import {
  FavoritesLink,
  LoginLink,
  ProfileLink,
  ShoppingCartLink,
} from '../header/Links';
import SearchBar from '../header/SearchBar';
import { useSession } from 'next-auth/client';
import PNavBar from '../header/PNavBar';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [session, loading] = useSession();
  const [onHover, setOnHover] = useState(false);

  return (
    <div>
      <div className={'relative bg-white border-b z-20'}>
        <div
          className={'w-full md:w-10/12 max-w-screen-xl mx-auto relative z-20'}
        >
          <div className={'flex items-center py-2 bg-white'}>
            <div className={'flex-0 cursor-pointer'}>
              <Link href='/'>
                <a>
                  <Image
                    src='/images/logo.svg'
                    alt='logo'
                    height={50}
                    width={150}
                  />
                </a>
              </Link>
            </div>
            <div className={'flex-grow'}>
              <SearchBar />
            </div>
            <div className={'flex-0'}>
              <ul className={'flex space-x-4 text-xs'}>
                {!session && !loading && <LoginLink />}
                {session && <ProfileLink />}
                <FavoritesLink />
                <ShoppingCartLink />
              </ul>
            </div>
          </div>

          <PNavBar onHover={onHover} setOnHover={setOnHover} />
        </div>
      </div>
      <div
        className={
          'w-full h-full fixed top-0 left-0 z-10 opacity-30 bg-black ' +
          (onHover ? 'block' : 'hidden')
        }
      ></div>
    </div>
  );
};

export default Header;
