import Link from 'next/link';
import AddProduct from '../../components/AddProduct';

export default function AddProductPage() {
  return (
    <div className={'w-full h-screen'}>
      <div className={'w-full max-w-screen-xl mx-auto'}>
        <div className={'grid grid-cols-6'}>
          <div className={'col-start-1 col-span-1'}>
            <div className={'flex flex-col '}>
              <div className={'p-4 text-center text-2xl font-bold bg-white'}>
                MKMR-STORE
              </div>
              <Link href='/admin'>
                <a
                  className={
                    'py-2 text-center text-lg font-bold text-gray-400 hover:text-black'
                  }
                >
                  Admin
                </a>
              </Link>
              <Link href='/admin/add'>
                <a
                  className={
                    'py-2 text-center text-lg text-[#5B73E8] font-bold bg-[#F3F8FB]'
                  }
                >
                  Add Product
                </a>
              </Link>
              <Link href='/admin/users'>
                <a
                  className={
                    'py-2 text-center text-lg font-bold text-gray-400 hover:text-black'
                  }
                >
                  Users
                </a>
              </Link>
            </div>
          </div>
          <div className={'col-start-2 col-span-5 '}>
            <div
              className={
                'py-4 text-lg font-bold bg-white text-black text-center'
              }
            >
              ADMIN PANEL
            </div>
            <div
              className={
                'w-full h-screen flex flex-col justify-start space-y-4 shadow-inner bg-[#F3F8FB]'
              }
            >
              <AddProduct />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
