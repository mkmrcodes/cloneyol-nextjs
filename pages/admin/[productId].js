import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import EditProduct from '../../components/EditProduct';
import { nestApiUrl } from '../../utils/constants';

const ProductEditPage = () => {
  const router = useRouter();
  let { productId } = router.query;
  if (!productId && typeof window !== 'undefined') {
    productId = window.location.pathname.split('/admin').pop();
  }
  // if (!router.isReady) {
  //   return <p>Loading</p>;
  // } causes hook order fail

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`${nestApiUrl}/items/${productId}`, fetcher);
  if (error) return <div>failed to load {error}</div>;
  if (!data) return <div>loading...</div>;

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
                    'py-2 text-center text-lg text-gray-400 font-bold hover:text-black'
                  }
                >
                  Add Product
                </a>
              </Link>
              <Link href='/admin/users'>
                <a
                  className={
                    'py-2 text-center text-lg text-gray-400 font-bold hover:text-black'
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
              <div className={'text-lg text-center font-bold py-4'}>
                EDIT PRODUCT
              </div>
              <EditProduct data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
