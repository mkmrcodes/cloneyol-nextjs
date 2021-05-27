import { useRouter } from 'next/router';

import { MdKeyboardArrowRight } from 'react-icons/md';

const ConfirmButton = () => {
  const router = useRouter();

  return (
    <button
      className={
        'w-full flex justify-center items-center text-white bg-primary text-xl font-bold p-2 rounded-sm'
      }
      onClick={() => router.push('/payment')}
    >
      <span>Sepeti Onayla</span>
      <MdKeyboardArrowRight className={'w-8 h-8 text-white pt-1'} />
    </button>
  );
};

export default ConfirmButton;
