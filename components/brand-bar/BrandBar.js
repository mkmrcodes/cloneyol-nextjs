import { Carousel } from '@trendyol-js/react-carousel';
import Image from 'next/image';

const BrandBar = () => {
  let brands = [];

  for (let i = 1; i <= 20; i++) {
    brands.push(
      <div
        key={i}
        id={i}
        className={
          'w-20 flex flex-col justify-center items-center hover:text-primary'
        }
      >
        <div className={'w-20 h-20 border-2 hover:border-primary rounded-full'}>
          <Image
            className={'rounded-full'}
            src={'/images/marka.png'}
            width={200}
            height={200}
          />
        </div>
        <p className={'text-xs'}>{`Marka-${i}`}</p>
      </div>
    );
  }

  return (
    <div>
      <Carousel
        className={'mt-4 tyol'}
        show={10.5}
        slide={3}
        swiping={true}
        transition={0.5}
        dynamic={true}
      >
        {brands}
      </Carousel>
    </div>
  );
};

export default BrandBar;
