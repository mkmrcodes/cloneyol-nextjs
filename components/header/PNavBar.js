import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductNavPanel from './ProductNavPanel';

const PNavBar = ({ onHover, setOnHover }) => {
  const Navs = () => {
    return (
      <li
        className={'group flex-shrink-0 flex-grow z-20 bg-white'}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div
          className={
            'group-hover:text-primary group-hover:border-b-2 group-hover:border-primary pb-0.5 text-center'
          }
        >
          <Link href={'/'}>SÜPERMARKET</Link>
        </div>

        <div
          className={
            'h-350 max-h-0 left-0 group-hover:max-h-350 overflow-hidden absolute bg-white ' +
            (onHover ? 'transition-maxHeight duration-300 delay-150' : '')
          }
        >
          <ProductNavPanel setOnHover={setOnHover} />
        </div>
      </li>
    );
  };
  return (
    <div className={'block'}>
      <div className={'relative z-20'}>
        <ul
          className={
            'flex w-full justify-around text-sm font-bold whitespace-nowrap relative'
          }
        >
          <Navs />
          <Navs />
          <Navs />
          <Navs />
          <Navs />
          <Navs />
        </ul>
      </div>
    </div>
  );
};

export default PNavBar;
