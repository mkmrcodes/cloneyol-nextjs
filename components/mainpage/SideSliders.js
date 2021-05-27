import Slider from 'react-slick';
import Image from 'next/image';

const campaigns = [];
for (let i = 1; i <= 3; i++) {
  campaigns.push(
    <div key={i} className={'cursor-pointer'}>
      <Image src={'/images/sideslider.png'} width={334} height={314} />
    </div>
  );
}
function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        top: '45%',
        right: '30px',
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-16 w-16'
        fill='none'
        viewBox='0 0 24 24'
        stroke='#d5d5d5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1'
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
      style={{
        ...style,
        display: 'block',
        top: '45%',
        left: '-15px',
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-16 w-16'
        fill='none'
        viewBox='0 0 24 24'
        stroke='#d5d5d5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1'
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </div>
  );
}
var settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  cssEase: 'linear',
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
};

const SideSliders = () => {
  return (
    <div className={'bg-white z-20'}>
      <div className={'mb-2'}>
        <Slider className={'bg-white'} {...settings}>
          {campaigns}
        </Slider>
      </div>
      <div className={'mb-2'}>
        <Slider {...settings}>{campaigns}</Slider>
      </div>
      <div className={'mb-2'}>
        <Slider {...settings}>{campaigns}</Slider>
      </div>
      <div className={'mb-2'}>
        <Slider {...settings}>{campaigns}</Slider>
      </div>
      <div className={'mb-2'}>
        <Slider {...settings}>{campaigns}</Slider>
      </div>
    </div>
  );
};

export default SideSliders;
