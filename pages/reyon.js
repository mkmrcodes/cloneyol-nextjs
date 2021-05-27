import React from 'react';
import PCard from '../components/product/PCard';
import { MdKeyboardArrowRight } from 'react-icons/md';
import RelatedCategoryFilter from '../components/filters/RelatedCategoryFilter';
import AllCategoryFilter from '../components/filters/AllCategoryFilter';
import CampaignFilter from '../components/filters/CampaignFilter';
import BrandFilter from '../components/filters/BrandFilter';
import PriceFilter from '../components/filters/PriceFilter';
import RatingFilter from '../components/filters/RatingFilter';
import CargoFilter from '../components/filters/CargoFilter';
import BasketDiscountFilter from '../components/filters/BasketDiscountFilter';

const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-4 w-4'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 5l7 7-7 7'
      />
    </svg>
  );
};

const Reyon = () => {
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-8 bg-white'}>
      <div className={'flex items-center text-sm my-2'}>
        <div>{`AnaSyafa`}</div>
        <span className={'text-primary px-2'}>
          <ArrowIcon />
        </span>
        <div>{`Süpermarket`}</div>
        <span className={'text-primary px-2'}>
          <ArrowIcon />
        </span>
        <div>{`Ev Bakım ve Temizlik`}</div>
        <span className={'text-primary px-2'}>
          <ArrowIcon />
        </span>
        <div>{`Çamaşır Yıkama Ürünleri`}</div>
      </div>

      <div className={'flex'}>
        <div className={'flex-none w-[185px]'}>
          <RelatedCategoryFilter />
          <AllCategoryFilter />
          <CampaignFilter />
          <BrandFilter />
          <PriceFilter />
          <CargoFilter />
          <BasketDiscountFilter />
          <RatingFilter />
        </div>
        <div className={'flex-grow px-2'}>
          <div className={'flex justify-between pt-2'}>
            <div
              className={'text-lg font-bold'}
            >{`"Çamaşır Yıkama" araması için 1001 sonuç listeleniyor`}</div>
            <select
              className={
                'form-select text-xs text-muted rounded-sm border-gray-300 focus:ring-0 focus:outline-none focus:border-gray-300'
              }
            >
              <option>Önerilen Sıralama</option>
              <option>En düşük fiyat</option>
              <option>En yüksek fiyat</option>
              <option>En yeniler</option>
              <option>En çok satanlar</option>
              <option>En çok beğenilenler</option>
              <option>En çok değerlendirilenler</option>
            </select>
          </div>

          <div className={'flex flex-wrap justify-between mt-2'}>
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
              promotion={'75 TL Üzeri 15 TL İndirim'}
              cargoFree={true}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
              cargoFree={true}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
              cargoFree={true}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
              cargoFree={true}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
            />
            <PCard
              oldPrice={'155,90'}
              price={'99,90'}
              discountRatio={'10'}
              discountPrice={'90'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reyon;
