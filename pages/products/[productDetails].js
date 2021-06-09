import axios from 'axios';
import DetailRight from '../../components/product/DetailRight';
import DetailLeft from '../../components/product/DetailLeft';
import { nestApiUrl } from '../../utils/constants';

const productDetails = ({ product }) => {
  return (
    <div
      className={'w-full md:w-10/12 max-w-screen-xl mx-auto bg-white relative'}
    >
      <div className={'flex'}>
        <div className={'w-[55%]'}>
          <DetailLeft product={product} />
        </div>
        <div className={'w-[45%]'}>
          <DetailRight product={product} />
        </div>
      </div>

      <div
        id='portal'
        className='absolute top-8 left-[580px] right-[1px] border border-red-600 z-10 bg-white overflow-hidden'
      ></div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get(`${nestApiUrl}/items`);

  const paths = response.data.map((product) => ({
    params: {
      productDetails: `${product.slug}-p-${product.id}`,
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const productDetails = params.productDetails;
  const productId = productDetails.substr(
    productDetails.lastIndexOf('-p-') + 3
  );

  const response = await axios.get(`${nestApiUrl}/items/${productId}`);

  const product = await response.data;

  return {
    props: {
      product,
    },
  };
}

export default productDetails;
