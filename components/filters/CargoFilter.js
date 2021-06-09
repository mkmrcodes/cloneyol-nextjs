import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const CargoFilter = ({ catId, brandId }) => {
  const url =
    `/sr?wc=${catId}` + (brandId ? `&wb=${brandId}` : '') + '&fc=true';
  return (
    <div className={'py-2 text-sm border-b'}>
      <Link href={url}>
        <a>
          <div className={'flex cursor-pointer'}>
            <MdCheckBoxOutlineBlank className={'w-5 h-5 text-gray-300 mr-1'} />

            <span>Kargo Bedava</span>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default CargoFilter;
