const prices = [
  { link: '/', title: '0 TL - 20 TL' },
  { link: '/', title: '20 TL - 30 TL' },
  { link: '/', title: '30 TL - 50 TL' },
  { link: '/', title: '50 TL - 80 TL' },
  { link: '/', title: '80 TL - 200 TL' },
  { link: '/', title: '200 TL - 1500 TL' },
];

const PriceFilter = () => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Fiyat</div>
      {prices.map((price, index) => {
        return (
          <a key={index} href={'#'}>
            <label
              className={
                'flex items-center ml-0.5 text-black text-sm cursor-pointer '
              }
              htmlFor={price.title}
            >
              <input
                id={price.title}
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
                {price.title}
              </div>
            </label>
          </a>
        );
      })}
    </div>
  );
};
export default PriceFilter;
