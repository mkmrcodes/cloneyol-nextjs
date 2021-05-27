import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import BasketButtons from './BasketButtons';
import NewRating from './NewRating';

const PCard = ({ product, promotion }) => {
  return (
    <div className={'w-[231px] h-[379px] bg-white relative mt-8 flex flex-col'}>
      <div className={'w-full'}>
        <div className={'relative w-full'}>
          <Link href={`/products/${product.slug}-p-${product.id}`}>
            <a>
              <div className={'w-full h-[225px] overflow-hidden'}>
                <div className={'aspect-w-1 aspect-h-1'}>
                  <Image
                    className={
                      'transform duration-500 ease-in-out hover:scale-105'
                    }
                    src={product.image}
                    alt={'image'}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              </div>
              {promotion && (
                <div
                  className={
                    'flex w-32 justify-center mx-auto rounded-sm text-xxs bg-primary text-center text-white p-0.5 z-2'
                  }
                >
                  {promotion}
                </div>
              )}
              <div className={'p-2'}>
                <div
                  className={
                    'text-sm w-full h-9 text-muted line-clamp-2 leading-[18px]'
                  }
                >
                  <span className={'font-bold mr-0.5 text-black'}>
                    {product.brand.brandName}
                  </span>
                  <span className={'relative'}>{product.name}</span>
                </div>
                <NewRating
                  value={product.rating.averageRating}
                  review={product.rating.ratingCount}
                />

                <div className={'w-full h-9 grid grid-cols-12 py-2'}>
                  <div className={'col-span-4'}>
                    <div
                      className={
                        'flex flex-col justify-center font-display text-sm'
                      }
                    >
                      {product.oldPrice && (
                        <div
                          className={'text-muted line-through'}
                        >{`${product.oldPrice} TL`}</div>
                      )}
                      {product.discountRatio && product.price && (
                        <div
                          className={'text-muted line-through'}
                        >{`${product.price} TL`}</div>
                      )}
                    </div>
                  </div>
                  <div className={'col-span-8'}>
                    <div className={'flex flex-col justify-center'}>
                      {product.discountRatio && (
                        <div
                          className={'text-xs font-bold'}
                        >{`Sepette %${product.discountRatio} İndirim`}</div>
                      )}
                      {product.discountPrice && (
                        <div
                          className={
                            'font-display font-bold text-primary text-lg'
                          }
                        >
                          {`${product.discountPrice} TL`}
                        </div>
                      )}
                      {!product.discountPrice && (
                        <div
                          className={
                            'font-display font-bold text-primary text-lg'
                          }
                        >
                          {`${product.price} TL`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {product.isCargoFree && (
                <div
                  className={
                    'absolute top-1 left-1 z-1 py-1 px-3 bg-[#535353] text-white font-bold text-xxs rounded-sm leading-none '
                  }
                >
                  <span className={'block text-center'}>KARGO</span>
                  <span className={'block text-center'}>BEDAVA</span>
                </div>
              )}
            </a>
          </Link>
          <div
            className={
              'absolute top-2 right-2 z-5 p-2 rounded-full bg-white border hover:text-primary shadow'
            }
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
                strokeWidth={1.2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <BasketButtons product={product} />
      </div>
    </div>
  );
};

export default PCard;
