import React, { useContext, useEffect } from 'react';
import PCard from '../components/product/PCard';
import RelatedCategoryFilter from '../components/filters/RelatedCategoryFilter';
import BrandFilter from '../components/filters/BrandFilter';
import PriceFilter from '../components/filters/PriceFilter';
import RatingFilter from '../components/filters/RatingFilter';
import CargoFilter from '../components/filters/CargoFilter';
import axios from 'axios';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FilterDropDown from '../components/product/FilterDropDown';
import { FilteredProducts } from '../components/sr/FilteredProducts';
import { nestApiUrl } from '../utils/constants';

const Cat = ({ products, filter, catId, brandId }) => {
  const router = useRouter();
  const category = filter.data.selectedFilters.filters;
  const priceRanges = filter.data.selectedFilters.priceRanges;
  const ratingsArr = filter.data.selectedFilters.ratingsArray;
  const a = filter.data.ancestors;
  const ancestors = [...a].reverse();

  const reqUrl = filter.data.selectedFilters.reqUrl;
  let brandName;
  if (filter.data.selectedFilters.brands !== null) {
    brandName = filter.data.selectedFilters.brands[0].brandName;
  }

  function handleClearBrand() {
    router.push(`/${category.catSlug}-x-c${category.id}`);
  }
  function handleClearFilters() {
    router.push(`/${category.catSlug}-x-c${category.id}`);
  }
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-8 bg-white'}>
      <div className={'flex items-center text-sm pt-2'}>
        <Link href={'/'}>
          <a className={'hover:underline'}>
            <div className={'flex items-center'}>
              {`AnaSayfa`}
              <MdKeyboardArrowRight className={'text-primary w-5 h-5'} />
            </div>
          </a>
        </Link>

        {ancestors.map((cat, index) => {
          return (
            <Link key={index} href={`/${cat.catSlug}-x-c${cat.id}`}>
              <a className={'hover:underline'}>
                <div
                  key={index}
                  className={
                    'flex items-center ' +
                    (index === ancestors.length - 1 ? 'font-bold' : '')
                  }
                >
                  {cat.catLabel}
                  {index !== ancestors.length - 1 ? (
                    <MdKeyboardArrowRight className={'text-primary w-5 h-5'} />
                  ) : (
                    ''
                  )}
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      <div className={'flex items-center text-sm my-2'}>
        <div className={'flex'}>
          <div className={'flex-none w-[185px]'}>
            <RelatedCategoryFilter filter={filter} />
            <BrandFilter filter={filter} selected={parseInt(brandId)} />
            <PriceFilter
              priceRanges={priceRanges}
              catId={catId}
              brandId={brandId}
            />
            <CargoFilter catId={catId} brandId={brandId} />
            <RatingFilter
              ratingsArr={ratingsArr}
              catId={catId}
              brandId={brandId}
            />
          </div>
          <div className={'flex-grow px-2'}>
            <div className={'flex justify-between pt-2'}>
              <div className={'text-lg font-bold'}>
                {brandName !== undefined
                  ? `"${brandName} ${category.catLabel}" araması için ${products.length} sonuç listeleniyor`
                  : `"${category.catLabel}" araması için ${products.length} sonuç listeleniyor`}
              </div>
              <FilterDropDown />
            </div>
            {brandId && (
              <div className={'flex flex-wrap mt-2'}>
                <div
                  className={
                    'flex border border-gray-300 rounded-sn items-center '
                  }
                >
                  <span className={'text-xs px-2'}>{brandName}</span>
                  <span
                    className={
                      'px-2 border-l cursor-pointer hover:bg-gray-200 '
                    }
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

            <FilteredProducts products={products} reqUrl={reqUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  const categories = await axios.get(`${nestApiUrl}/category`);

  const catPaths = categories.data.map((cat) => ({
    params: { catSlug: `${cat.catSlug}-x-c${cat.id.toString()}` },
  }));

  let brands = [];
  const catIds = categories.data.map((cat) => cat.id);
  for (let i = 0; i <= catIds.length - 1; i++) {
    const brandsOfCat = await axios.get(`${nestApiUrl}/sr/${catIds[i]}`);
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
  const filterUrl =
    `${nestApiUrl}/sr?wc=${catId}` + (brandId !== '' ? `&wb=${brandId}` : '');
  const productsUrl =
    `${nestApiUrl}/items?wc=${catId}` +
    (brandId !== '' ? `&wb=${brandId}` : '');
  const [filter, products] = await Promise.all([
    axios.get(filterUrl).then((res) => res.data),
    axios.get(productsUrl).then((res) => res.data),
  ]);

  return {
    props: {
      products,
      filter,
      catId,
      brandId,
    },
  };
}

export default Cat;
