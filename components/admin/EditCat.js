import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nestApiUrl } from '../../utils/constants';
import { CgCloseR } from 'react-icons/cg';

const EditCat = ({ data, setShowEdit, getCats }) => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

  const intialValues = {
    brandName: data.brandName,
    brandSlug: data.brandSlug,
  };

  const updateBrand = async (values) => {
    console.log('values', values);
    const { brandName, brandSlug } = values;

    const body = {
      brandName,
      brandSlug,
    };
    await axios
      .patch(`${nestApiUrl}/brands/${data.brandId}`, body)
      .catch((e) => {
        setIsMsgFail(true);
        setIsMsgSentProgress(false);
      });
    getBrands();
    setShowEdit(false);
  };

  const onSubmit = async (values) => {
    if (Object.keys(errors).length !== 0) {
      console.log('form error:', errors);
    }
    setIsMsgSentProgress(true);
    await updateBrand(values);
    setIsMsgSentProgress(false);
  };

  return (
    <div className={'w-2/6 my-8 mx-auto bg-white'}>
      <form className={'border rounded-sm'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'text-right p-2'}>
          <button onClick={() => setShowEdit(false)}>
            <CgCloseR className={'w-6 h-6 text-red-600'} />
          </button>
        </div>
        <div
          className={
            'w-full mx-auto flex flex-col justify-center items-center px-8 py-6 text-black'
          }
        >
          <div className={'w-full mx-auto flex flex-col p-2'}>
            <label
              className={'mb-2 text-black text-sm font-bold'}
              htmlFor={'brandId'}
            >
              {'Brand Id'}
            </label>
            <input
              type='text'
              className={
                'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
              }
              {...register('brandId', { required: true })}
              defaultValue={data.brandId}
            />
            <ErrorMessage
              errors={errors}
              name='brandId'
              render={({ message }) => (
                <p
                  className={'mt-1 text-xs font-bold text-red-700'}
                  role='alert'
                >
                  {message}
                </p>
              )}
            />
          </div>

          <div className={'w-full mx-auto flex flex-col p-2'}>
            <label
              className={'mb-2 text-black text-sm font-bold'}
              htmlFor={'brandName'}
            >
              {'Brand Name'}
            </label>
            <input
              id='brandName'
              type='text'
              {...register('brandName', { required: true })}
              className={
                'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
              }
              defaultValue={intialValues.brandName}
            />
            <ErrorMessage
              errors={errors}
              name='brandName'
              render={({ message }) => (
                <p
                  className={'mt-1 text-xs font-bold text-red-700'}
                  role='alert'
                >
                  {message}
                </p>
              )}
            />
          </div>
          <div className={'w-full mx-auto flex flex-col p-2'}>
            <label
              className={'mb-2 text-black text-sm font-bold'}
              htmlFor={'brandSlug'}
            >
              {'Brand Slug'}
            </label>
            <input
              id='brandSlug'
              type='text'
              {...register('brandSlug', { required: true })}
              className={
                'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
              }
              defaultValue={intialValues.brandSlug}
            />
            <ErrorMessage
              errors={errors}
              name='brandSlug'
              render={({ message }) => (
                <p
                  className={'mt-1 text-xs font-bold text-red-700'}
                  role='alert'
                >
                  {message}
                </p>
              )}
            />
          </div>
          <div className={'text-center'}>
            <button
              className={
                'bg-primary text-white mt-2 py-2 px-6 rounded-sm inline-flex justify-center tracking-wide disabled:bg-gray-300'
              }
              type='submit'
              disabled={isSubmitting}
            >
              {!isMsgSentProgress ? (
                <div className={'text-base font-bold'}>UPDATE BRAND</div>
              ) : (
                <div
                  style={{ borderTopColor: 'transparent' }}
                  className='border-solid animate-spin rounded-full border-gray-200 border-4 h-6 w-6'
                ></div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCat;
