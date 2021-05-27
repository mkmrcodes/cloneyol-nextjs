import Slider from 'react-slick';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactImageMagnify from '@milosmladenovicwork/react-image-magnify';

const settingsMain = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.slider-nav',
  cssEase: 'linear',
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
};

const settingsThumbs = {
  vertical: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
  centerMode: true,
  swipeToSlide: true,
  focusOnSelect: true,
  centerPadding: '10px',
  cssEase: 'linear',
};

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
        zIndex: '5',
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
        zIndex: '5',
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

const DetailLeft = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const sliderRef = useRef();

  function gotoSlide(index) {
    sliderRef.current.slickGoTo(index, true);
  }
  const rimProps = {
    enlargedImagePortalId: 'portal',
    enlargedImageContainerDimensions: {
      width: '100%',
      height: '100%',
    },
  };

  return (
    <>
      <div className={'flex space-x-3 mt-8 relative'}>
        <div className='w-[15%]'>
          <Slider
            className={'thumbnail-slider-wrap bg-white'}
            {...settingsThumbs}
            asNavFor={nav1}
            ref={sliderRef}
          >
            <div className={''} onMouseEnter={() => gotoSlide(0)}>
              <img
                className={'w-20 border hover:border-red-600'}
                src={'/images/1_org.jpg'}
              />
            </div>

            {/* <div className={''} onMouseEnter={() => gotoSlide(1)}>
              <img
                className={'w-20 border hover:border-red-600'}
                src={'/images/2_org.jpg'}
              />
            </div>
            <div className={''} onMouseEnter={() => gotoSlide(2)}>
              <img
                className={'w-20 border hover:border-red-600'}
                src={'/images/3_org.jpg'}
              />
            </div> */}
          </Slider>
        </div>
        <div className='w-[80%]'>
          <div className={'w-full'}>
            <Slider
              {...settingsMain}
              asNavFor={nav2}
              ref={(slider) => setSlider1(slider)}
            >
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: '/images/1_org_zoom.jpg',
                  },
                  largeImage: {
                    src: '/images/1_org_zoom.jpg',
                    width: 830,
                    height: 1244,
                  },
                  lensStyle: { backgroundColor: 'rgba(0,0,0,.3)' },
                }}
                {...rimProps}
              />
              {/* <img
              className={'slick-slide-image border'}
              src={'/images/1_org.jpg'}
            />
            <img
              className={'slick-slide-image border'}
              src={'/images/2_org.jpg'}
            />
            <img
              className={'slick-slide-image border'}
              src={'/images/3_org.jpg'}
            /> */}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLeft;
