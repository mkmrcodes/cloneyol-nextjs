import Link from 'next/link';
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const RatingSearch = ({ pr, ratingsArr, url }) => {
  const ratingsTexts = [
    '1 Yıldız ve Üzeri',
    '2 Yıldız ve Üzeri',
    '3 Yıldız ve Üzeri',
    '4 Yıldız ve Üzeri',
  ];
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Ürün Değerlendirmesi</div>
      {ratingsArr.map((r, index) => {
        //const newArr = brandsArr.filter((brand) => brand !== brand.brand_id);
        return (
          <Link
            key={index}
            href={
              r === parseInt(pr)
                ? url.replace(/&pr=\d+([-]+\d+)*/, '')
                : `${url.replace(/&pr=\d+([-]+\d+)*/, '')}&pr=${r}`
            }
          >
            <a>
              <div className={'flex cursor-pointer mt-1'}>
                {r === parseInt(pr) ? (
                  <MdCheckBox className={'w-5 h-5 text-primary mr-1'} />
                ) : (
                  <MdCheckBoxOutlineBlank
                    className={'w-5 h-5 text-gray-400 mr-1'}
                  />
                )}
                <span className={'hover:text-gray-400'}>
                  {ratingsTexts[index]}
                </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default RatingSearch;
