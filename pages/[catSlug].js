import React, { useContext, useEffect } from 'react';
import PCard from '../components/product/PCard';
import RelatedCategoryFilter from '../components/filters/RelatedCategoryFilter';
import CampaignFilter from '../components/filters/CampaignFilter';
import BrandFilter from '../components/filters/BrandFilter';
import PriceFilter from '../components/filters/PriceFilter';
import RatingFilter from '../components/filters/RatingFilter';
import CargoFilter from '../components/filters/CargoFilter';
import BasketDiscountFilter from '../components/filters/BasketDiscountFilter';
import axios from 'axios';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRouter } from 'next/router';

const Cat = ({ products, filter, catId, brandId, brand }) => {
  const router = useRouter();
  const category = filter.data.selectedFilters.filters;

  function handleClearBrand() {
    router.push(`/${category.catSlug}-x-c${category.id}`);
  }
  function handleClearFilters() {
    router.push(`/${category.catSlug}-x-c${category.id}`);
  }
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-8 bg-white'}>
      <div className={'flex items-center text-sm my-2'}>
        <div>{`AnaSyafa`}</div>
        <span className={'text-primary px-2'}>
          <MdKeyboardArrowRight />
        </span>
        <div>{`Süpermarket`}</div>
        <span className={'text-primary px-2'}>
          <MdKeyboardArrowRight />
        </span>
        <div>{`Ev Bakım ve Temizlik`}</div>
        <span className={'text-primary px-2'}>
          <MdKeyboardArrowRight />
        </span>
        <div>{`Çamaşır Yıkama Ürünleri`}</div>
      </div>

      <div className={'flex'}>
        <div className={'flex-none w-[185px]'}>
          <RelatedCategoryFilter filter={filter} />

          <CampaignFilter />
          <BrandFilter filter={filter} selected={parseInt(brandId)} />
          <PriceFilter />
          <CargoFilter />
          <BasketDiscountFilter />
          <RatingFilter />
        </div>
        <div className={'flex-grow px-2'}>
          <div className={'flex justify-between pt-2'}>
            <div className={'text-lg font-bold'}>
              {brand
                ? `"${brand.brandName} ${category.catLabel} " araması için ${products.length} sonuç listeleniyor`
                : `${category.catLabel} " araması için ${products.length} sonuç listeleniyor`}
            </div>
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
          {brand && (
            <div className={'flex flex-wrap mt-2'}>
              <div
                className={
                  'flex border border-gray-300 rounded-sn items-center '
                }
              >
                <span className={'text-xs px-2'}>{brand.brandName}</span>
                <span
                  className={'px-2 border-l cursor-pointer hover:bg-gray-200 '}
                  onClick={handleClearBrand}
                >
                  x
                </span>
              </div>
              <div
                className={
                  'flex group border border-gray-500 rounded-sm items-center ml-2 hover:border-primary cursor-pointer'
                }
              >
                <span
                  className={
                    'text-xs px-2 text-gray-500 group-hover:text-primary'
                  }
                  onClick={handleClearFilters}
                >
                  Filtreleri Temizle
                </span>
              </div>
            </div>
          )}

          <div className={'flex flex-wrap justify-between mt-2'}>
            {products.map((product, index) => {
              return (
                <PCard
                  key={index}
                  product={product}
                  promotion={'75 TL Üzeri 15 TL İndirim'}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  const categories = await axios.get(`http://localhost:3001/api/category`);

  const catPaths = categories.data.map((cat) => ({
    params: { catSlug: `${cat.catSlug}-x-c${cat.id.toString()}` },
  }));

  let brands = [];
  const catIds = categories.data.map((cat) => cat.id);
  for (let i = 0; i <= catIds.length - 1; i++) {
    const brandsOfCat = await axios.get(
      `http://localhost:3001/api/sr/${catIds[i]}`
    );
    brands.push(...brandsOfCat.data.data.brands);
  }

  const brandPaths = brands.map((brand) => ({
    params: {
      catSlug: `${brand.brand_brandSlug}-${
        brand.category_catSlug
      }-x-b${brand.brand_id.toString()}-c${brand.category_id.toString()}`,
    },
  }));

  const paths = [...brandPaths, ...catPaths];
  //console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const catSlug = params.catSlug;
  const parameters = catSlug.substr(catSlug.indexOf('-x-') + 3);
  const catId = parameters.substr(parameters.indexOf('c') + 1);
  const removeCat = '-c' + catId;
  const removeCat1 = 'c' + catId;
  const brandId = parameters
    .replace(removeCat, '')
    .replace(removeCat1, '')
    .replace('b', '');
  const res = await axios.get(`http://localhost:3001/api/sr?wc=${catId}`);
  const filter = await res.data;

  let products;
  if (brandId === '') {
    const response = await axios.get(
      `http://localhost:3001/api/items?catId=${catId}`
    );
    products = await response.data;
  } else {
    const response1 = await axios.get(
      `http://localhost:3001/api/items?catId=${catId}&brandId=${brandId}`
    );
    products = await response1.data;
  }
  let brand = null;
  if (brandId !== '') {
    const response2 = await axios.get(
      `http://localhost:3001/api/brands/${brandId}`
    );
    brand = response2.data;
  }
  return {
    props: {
      products,
      filter,
      catId,
      brandId,
      brand,
    },
  };
}

export default Cat;
