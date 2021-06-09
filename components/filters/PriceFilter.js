import Link from 'next/link';
import { IoMdRadioButtonOff } from 'react-icons/io';

const PriceFilter = ({ priceRanges, catId, brandId }) => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Fiyat</div>
      {priceRanges.map((range, index) => {
        //const newArr = brandsArr.filter((brand) => brand !== brand.brand_id);
        const url =
          `/sr?wc=${catId}` +
          (brandId ? `&wb=${brandId}` : '') +
          `&prc=${range}`;
        return (
          <Link key={index} href={url}>
            <a>
              <div className={'flex cursor-pointer mt-1'}>
                <IoMdRadioButtonOff className={'w-5 h-5 text-gray-300 mr-1'} />

                <span className={'hover:text-gray-400'}>{`${range} TL`} </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default PriceFilter;
