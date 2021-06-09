import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const RatingFilter = ({ ratingsArr, catId, brandId }) => {
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
        const url =
          `/sr?wc=${catId}` + (brandId ? `&wb=${brandId}` : '') + `&pr=${r}`;
        return (
          <Link key={index} href={url}>
            <a>
              <div className={'flex cursor-pointer mt-1'}>
                <MdCheckBoxOutlineBlank
                  className={'w-5 h-5 text-gray-300 mr-1'}
                />

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
export default RatingFilter;
