import Link from 'next/link';
import { IoMdRadioButtonOn } from 'react-icons/io';
import { IoMdRadioButtonOff } from 'react-icons/io';

const PriceSearch = ({ prc, priceRanges, url }) => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Fiyat</div>
      {priceRanges.map((range, index) => {
        //const newArr = brandsArr.filter((brand) => brand !== brand.brand_id);
        return (
          <Link
            key={index}
            href={
              range === prc
                ? url.replace(/&prc=\d+([-]+\d+)*/, '')
                : `${url.replace(/&prc=\d+([-]+\d+)*/, '')}&prc=${range}`
            }
          >
            <a>
              <div className={'flex cursor-pointer mt-1'}>
                {range === prc ? (
                  <IoMdRadioButtonOn className={'w-5 h-5 text-primary mr-1'} />
                ) : (
                  <IoMdRadioButtonOff
                    className={'w-5 h-5 text-gray-300 mr-1'}
                  />
                )}
                <span className={'hover:text-gray-400'}>{`${range} TL`} </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default PriceSearch;
