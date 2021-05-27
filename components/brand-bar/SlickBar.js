import Slider from 'react-slick';
import Image from 'next/image';

let brands = [];
let stikkers = [
  'firsat',
  'secili',
  'senin',
  'coksatan',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
  'marka3',
];

for (let i = 0; i <= 19; i++) {
  brands.push(
    <div
      key={i}
      id={i}
      className={'group w-[76px] flex flex-col justify-center items-center'}
    >
      <div
        className={
          'w-[76px] h-[76px] border group-hover:border-primary rounded-full'
        }
      >
        <Image
          className={'rounded-full'}
          src={`/images/${stikkers[i]}.png`}
          width={200}
          height={200}
        />
      </div>
      <p className={'text-xs font-bold pl-5 group-hover:text-primary'}>
        {i < 4 ? '' : 'Marka'}
      </p>
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9 5l7 7-7 7'
        />
      </svg>
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </div>
  );
}

const SlickBar = () => {
  var settings = {
    speed: 500,
    slidesToShow: 11,
    slidesToScroll: 4,
    arrows: true,
    infinite: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div className={'bg-white'}>
      <Slider className={'bg-white'} {...settings}>
        {brands}
      </Slider>
    </div>
  );
};

export default SlickBar;
