import Product from './product';

const ProductList = ({ data }) => {
  return (
    <ul
      className={
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      }
    >
      {data.map((item) => (
        <Product key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default ProductList;
