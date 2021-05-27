const BasketDiscountFilter = () => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <a href={'#'}>
        <label
          className={
            'flex items-center ml-0.5 text-black text-sm cursor-pointer '
          }
          htmlFor={'basketdiscount'}
        >
          <input
            id={'basketdiscount'}
            type='checkbox'
            className={
              'border-gray-300 rounded-sm checked:bg-primary checked:border-primary checked:focus:bg-primary checked:hover:bg-primary hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
            }
            value='false'
          />
          <div
            className={
              'p-0.5 ml-1 cursor-pointer hover:text-gray-400 label-cb-checked:font-bold'
            }
          >
            {'Sepette İndirimli Ürünler'}
          </div>
        </label>
      </a>
    </div>
  );
};
export default BasketDiscountFilter;
