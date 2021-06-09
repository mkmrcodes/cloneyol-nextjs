import Link from 'next/link';
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const CargoSearch = ({ fc, url }) => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <Link
        href={
          fc
            ? url.replace('fc=true&', '').replace('&fc=true', '')
            : `${url}&fc=true`
        }
      >
        <a>
          <div className={'flex cursor-pointer'}>
            {fc ? (
              <MdCheckBox className={'w-5 h-5 text-primary mr-1'} />
            ) : (
              <MdCheckBoxOutlineBlank
                className={'w-5 h-5 text-gray-300 mr-1'}
              />
            )}
            <span>Kargo Bedava</span>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default CargoSearch;
