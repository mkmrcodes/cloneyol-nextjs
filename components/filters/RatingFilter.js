const ratings = [
  { link: '/', title: '4 Yıldız ve Üzeri' },
  { link: '/', title: '3 Yıldız ve Üzeri' },
  { link: '/', title: '2 Yıldız ve Üzeri' },
  { link: '/', title: '1 Yıldız ve Üzeri' },
];

const RatingFilter = () => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Ürün Değerlendirmesi</div>
      {ratings.map((rating, index) => {
        return (
          <a key={index} href={'#'}>
            <label
              className={
                'flex items-center ml-0.5 text-black text-sm cursor-pointer '
              }
              htmlFor={rating.title}
            >
              <input
                id={rating.title}
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
                {rating.title}
              </div>
            </label>
          </a>
        );
      })}
    </div>
  );
};
export default RatingFilter;
