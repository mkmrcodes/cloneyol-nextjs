import Link from 'next/link';
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const BrandSearch = ({ filter, wb, wc }) => {
  let brandsArr = [];
  if (wb) {
    brandsArr = wb.split(',').map((x) => +x);
  }

  const brands = filter.data.brands;
  const category = filter.data.selectedFilters.filters;

  return (
    <div className={'py-2 text-sm border-b h-64 overflow-y-auto'}>
      <div className={'font-bold'}>Marka</div>
      {brands.map((brand) => {
        //const newArr = brandsArr.filter((brand) => brand !== brand.brand_id);
        return (
          <Link key={brand.brand_id} href={brand.url}>
            <a>
              <div className={'flex cursor-pointer mt-1'}>
                {brandsArr.includes(brand.brand_id) ? (
                  <MdCheckBox className={'w-5 h-5 text-primary mr-1'} />
                ) : (
                  <MdCheckBoxOutlineBlank
                    className={'w-5 h-5 text-gray-300 mr-1'}
                  />
                )}
                <span className={'hover:text-gray-400'}>
                  {brand.brand_brandName}
                </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default BrandSearch;
