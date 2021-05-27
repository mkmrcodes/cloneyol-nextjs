import Link from 'next/link';
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const BrandFilter = ({ filter, selected }) => {
  const brands = filter.data.brands;
  const category = filter.data.selectedFilters.filters;
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Marka</div>
      {brands.map((brand) => {
        return (
          <Link
            key={brand.brand_id}
            href={
              selected === brand.brand_id
                ? `/${category.catSlug}-x-c${category.id}`
                : selected !== brand.brand_id && !isNaN(selected)
                ? `/sr?wc=${category.id}&wb=${selected},${brand.brand_id}`
                : `/${brand.brand_brandSlug}-${category.catSlug}-x-b${brand.brand_id}-c${category.id}`
            }
          >
            <a>
              <div className={'flex cursor-pointer'}>
                {selected === brand.brand_id ? (
                  <MdCheckBox className={'w-5 h-5 text-primary mr-1'} />
                ) : (
                  <MdCheckBoxOutlineBlank
                    className={'w-5 h-5 text-muted mr-1'}
                  />
                )}
                <span>{brand.brand_brandName}</span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default BrandFilter;
