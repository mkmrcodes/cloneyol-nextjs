import axios from 'axios';
import { useRouter } from 'next/router';
import { FilteredProducts } from '../../components/sr/FilteredProducts';
import RelatedCategorySearch from '../../components/sr/RelatedCategorySearch';
import BrandSearch from '../../components/sr/BrandSearch';
import { MdKeyboardArrowRight } from 'react-icons/md';
import CargoSearch from '../../components/sr/CargoSearch';
import PriceSearch from '../../components/sr/PriceSearch';
import RatingSearch from '../../components/sr/RatingSearch';
import { useContext } from 'react';
import { BasketContext } from '../../store/BasketContext';

const SearchPage = ({ filter, products, wc, wb, fc, prc, pr }) => {
  const { basketItems, addBasket } = useContext(BasketContext);
  const router = useRouter();

  const category = filter.data.selectedFilters.filters;
  const selectedBrands = filter.data.selectedFilters.brands;
  const priceRanges = filter.data.selectedFilters.priceRanges;
  const ratingsArr = filter.data.selectedFilters.ratingsArray;
  const reqUrl = filter.data.selectedFilters.reqUrl;

  function handleClear({ wbf, fcf, prcf, prf }) {
    let url;
    let brandArr;
    if (wb) {
      brandArr = wb.split(',').map((x) => +x);
    }
    if (wbf !== undefined) {
      if (brandArr.length <= 1) {
        url = reqUrl.replace(/&wb=\d+([,]+\d+)*/, ``);
      } else {
        let newWb = wb
          .replace(`${wbf},`, '')
          .replace(`,${wbf}`, '')
          .replace(`${wbf}`, '');
        url = reqUrl.replace(/wb=\d+([,]+\d+)*/, `wb=${newWb}`);
      }
      router.push(url);
    }
    if (fcf) {
      url = reqUrl.replace('&fc=true', '').replace('fc=true', '');
      router.push(url);
    }
    if (prcf) {
      url = reqUrl.replace(/&prc=\d+([-]+\d+)|prc=\d+([-]+\d+)*/, '');
      console.log(url);
      router.push(url);
    }
    if (prf) {
      url = reqUrl.replace(/&pr=\d+|pr=\d+/, '');
      console.log(url);
      router.push(url);
    }
  }

  function handleClearFilters() {
    router.push(`/${category.catSlug}-x-c${category.id}`);
  }

  return (
    <div className={'w-full max-w-screen-xl mx-auto px-8 bg-white'}>
      {/* <div>{JSON.stringify(basketItems)}</div>
      <button
        onClick={() => {
          products[0].qty = 1;
          addBasket(products[0]);
        }}
      >
        +
      </button> */}
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
          <RelatedCategorySearch filter={filter} wb={wb} wc={wc} />
          <BrandSearch filter={filter} wb={wb} />
          <PriceSearch
            prc={prc}
            priceRanges={priceRanges}
            url={filter.data.selectedFilters.reqUrl}
          />

          <RatingSearch
            pr={pr}
            ratingsArr={ratingsArr}
            url={filter.data.selectedFilters.reqUrl}
          />
          <CargoSearch fc={fc} url={filter.data.selectedFilters.reqUrl} />
        </div>
        <div className={'flex-grow px-2'}>
          <div className={'flex justify-between pt-2'}>
            <div className={'text-lg font-bold'}>
              {`"${category.catLabel}" araması için ${products.length} sonuç listeleniyor`}
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
          <div className={'flex flex-wrap mt-2'}>
            {wb &&
              selectedBrands.map((brand) => {
                return (
                  <div
                    key={brand.id}
                    className={
                      'flex border border-gray-300 rounded-sn items-center mr-2 '
                    }
                  >
                    <span className={'text-xs px-2'}>{brand.brandName}</span>
                    <span
                      className={
                        'px-2 border-l cursor-pointer hover:bg-gray-200 '
                      }
                      onClick={() => handleClear({ wbf: brand.id })}
                    >
                      x
                    </span>
                  </div>
                );
              })}
            {fc && (
              <div
                className={
                  'flex border border-gray-300 rounded-sn items-center mr-2 '
                }
              >
                <span className={'text-xs px-2'}>Kargo Bedava</span>
                <span
                  className={'px-2 border-l cursor-pointer hover:bg-gray-200 '}
                  onClick={() => handleClear({ fcf: true })}
                >
                  x
                </span>
              </div>
            )}
            {prc && (
              <div
                className={
                  'flex border border-gray-300 rounded-sn items-center mr-2 '
                }
              >
                <span className={'text-xs px-2'}>{prc} TL</span>
                <span
                  className={'px-2 border-l cursor-pointer hover:bg-gray-200 '}
                  onClick={() => handleClear({ prcf: true })}
                >
                  x
                </span>
              </div>
            )}
            {pr && (
              <div
                className={
                  'flex border border-gray-300 rounded-sn items-center mr-2 '
                }
              >
                <span className={'text-xs px-2'}>{pr} Yıldız Ve Üzeri</span>
                <span
                  className={'px-2 border-l cursor-pointer hover:bg-gray-200 '}
                  onClick={() => handleClear({ prf: true })}
                >
                  x
                </span>
              </div>
            )}
            {(wc || wb || fc || prc || pr) && (
              <div
                className={
                  'flex group border border-gray-500 rounded-sm items-center hover:border-primary cursor-pointer'
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
            )}
          </div>
          <FilteredProducts products={products} />
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (ctx) => {
  const BASEURL = 'http://localhost:3001/api';
  const reqUrl = decodeURIComponent(ctx.resolvedUrl);

  //console.log('req: ', reqUrl);
  const wc = ctx.query.wc.toString();
  let fc = ctx.query.fc;
  let prc = ctx.query.prc;
  let pr = ctx.query.pr;
  if (prc === undefined) {
    prc = null;
  }
  if (pr === undefined) {
    pr = null;
  }
  let wb;
  if (ctx.query.wb !== undefined) {
    wb = ctx.query.wb.toString();
  }

  const filterUrl = `${BASEURL}${reqUrl}`;
  const productsUrl = `${BASEURL}${reqUrl.replace('sr?', 'items?')}`;

  const [filter, products] = await Promise.all([
    axios.get(filterUrl).then((res) => res.data),
    axios.get(productsUrl).then((res) => res.data),
  ]);

  if (wb === undefined) {
    wb = null;
  }
  if (fc === undefined) {
    fc = null;
  }

  return { props: { filter, products, wb, wc, fc, prc, pr } };
};

export default SearchPage;
