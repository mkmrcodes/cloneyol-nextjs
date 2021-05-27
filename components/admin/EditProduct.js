import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../../utils/constants';

const EditProduct = ({ data, setShowEdit, getProducts }) => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);
  const [newImg, setNewImg] = useState(data.image);
  console.log(data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

  const fileUploadHandler = async (image) => {
    const fileData = new FormData();
    fileData.append('productImg', image, image.name);
    await axios.post(`${nestApiUrl}/upload`, fileData).catch((e) => {
      setIsMsgFail(true);
      setIsMsgSentProgress(false);
    });
  };
  const updateProduct = async (values) => {
    let {
      productCode,
      productKind,
      productName,
      productPrice,
      productImg,
    } = values;
    fileUploadHandler(productImg[0]);
    productImg = `/images/${productImg[0].name}`;
    const body = {
      productCode: productCode,
      productKind: productKind,
      productName: productName,
      productPrice: productPrice,
      productImg: productImg,
    };
    await axios
      .patch(`${nestApiUrl}/items/${data.id}/update`, body)
      .catch((e) => {
        setIsMsgFail(true);
        toast.error('ERROR');
        setIsMsgSentProgress(false);
      });
    getProducts();
    toast.success('PRODUCT UPDATED!');
  };

  const intialValues = {
    productCode: data.productCode,
    productKind: data.productKind,
    productName: data.productName,
    productPrice: data.productPrice,
    productImg: data.productImg,
  };
  const onSubmit = async (values) => {
    if (Object.keys(errors).length !== 0) {
      toast.error('ERROR');
    }
    setIsMsgSentProgress(true);
    await updateProduct(values);
    setIsMsgSentProgress(false);
    reset({ intialValues });
  };

  return (
    <div className={'mt-8 mx-16 rounded-lg'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex flex-col mx-4 text-black'}>
          <div className={'w-4/6 mx-auto flex flex-col p-2'}>
            <label
              className={'mb-0 text-gray-400 font-bold'}
              htmlFor={'productCode'}
            >
              {'Product Code'}
            </label>
            <input
              {...register('productCode', { required: true })}
              className={
                'px-3 py-2 bg-white border border-white rounded-lg shadow-lg'
              }
              defaultValue={intialValues.productCode}
            />
            {errors.productCode && <span>This field is required</span>}
          </div>
          <div className={'w-4/6 mx-auto flex flex-col p-2'}>
            <label
              className={'mb-0 text-gray-400 font-bold'}
              htmlFor={'productKind'}
            >
              {'Product Kind'}
            </label>
            <input
              {...register('productKind', { required: true })}
              className={
                'px-3 py-2 bg-white border border-white rounded-lg shadow-lg '
              }
              defaultValue={intialValues.productKind}
            />
            {errors.productKind && <span>This field is required</span>}
          </div>
          <div className={'w-4/6 mx-auto flex flex-col p-2'}>
            <label
              className={'mb-0 text-gray-400 font-bold'}
              htmlFor={'productName'}
            >
              {'Product Name'}
            </label>
            <input
              {...register('productName', { required: true })}
              className={
                'px-3 py-2 bg-white border border-white rounded-lg shadow-lg '
              }
              defaultValue={intialValues.productName}
            />
            {errors.productName && <span>This field is required</span>}
          </div>
          <div className={'w-4/6 mx-auto flex flex-col p-2'}>
            <label
              className={'mb-0 text-gray-400 font-bold'}
              htmlFor={'productPrice'}
            >
              {'Product Price'}
            </label>
            <input
              {...register('productPrice', {
                required: true,
                min: 1,
                max: 9999,
              })}
              type='number'
              step='.01'
              className={
                'px-3 py-2 bg-white border border-white rounded-lg shadow-lg '
              }
              style={{ MozAppearance: 'textfield' }}
              defaultValue={intialValues.productPrice}
              onChange={(e) => {
                parseFloat(e.target.value).toFixed(2);
              }}
            />
            {errors.productPrice && (
              <span>This field is required and Must be in 1-9999</span>
            )}
          </div>
          <div className={'mx-auto flex flex-col p-2'}>
            <Image src={newImg} alt='newImg' width={180} height={180} />
          </div>
          <div className={'w-4/6 mx-auto flex flex-col p-2'}>
            <label
              className={'mb-0 text-gray-400 font-bold'}
              htmlFor={'productImg'}
            >
              {'Product Image'}
            </label>
            <input
              {...register('productImg', { required: true })}
              type='file'
              accept='image/*'
              className={
                'px-3 py-2 bg-white border border-white rounded-lg shadow-lg '
              }
              onChange={(e) => {
                const newImg1 = e.target.value.replace(
                  'C:\\fakepath\\',
                  '/images/'
                );

                setNewImg(newImg1);
              }}
              // defaultValue={intialValues.productImg}
            />
            {errors.productImg && <span>This field is required</span>}
          </div>
          <div className={'mt-4 text-center'}>
            {isMsgFail ? (
              <div
                className={
                  'w-full py-2 px-6 bg-red-500 text-white border rounded-md text-center'
                }
              >
                Hata! Lütfen daha sonra tekrar deneyiniz
              </div>
            ) : null}
            <button
              className={
                'w-80 font-body bg-[#5B73E8] text-white py-2 px-6 rounded inline-flex justify-center tracking-wide disabled:bg-gray-300 ' +
                (isMsgFail ? 'hidden' : '')
              }
              type='submit'
              disabled={isSubmitting}
            >
              {!isMsgSentProgress ? (
                <div className={'flex'}>
                  <div className={'mr-2'}>
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
                        strokeWidth={2}
                        d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                      />
                    </svg>
                  </div>
                  <span>UPDATE PRODUCT</span>
                </div>
              ) : (
                <div
                  style={{ borderTopColor: 'transparent' }}
                  className='border-solid animate-spin rounded-full border-purple-600 border-4 h-6 w-6'
                ></div>
              )}
            </button>
            <ToastContainer autoClose={3000} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
