import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nestApiUrl } from '../../utils/constants';
import { CgCloseR } from 'react-icons/cg';

const AddPromotion = ({ setShowAdd, getPromotions }) => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });
  const intialValues = {
    promotionLabel: '',
    promotionDiscount: '',
  };
  const createPromotion = async (values) => {
    console.log('values', values);
    const { promotionLabel, promotionDiscount } = values;

    const body = {
      promotionLabel,
      promotionDiscount,
    };
    await axios.post(`${nestApiUrl}/promotions`, body).catch((e) => {
      setIsMsgFail(true);
      setIsMsgSentProgress(false);
    });
    getPromotions();
  };

  const onSubmit = async (values) => {
    if (Object.keys(errors).length !== 0) {
      console.log('form error:', errors);
    }
    setIsMsgSentProgress(true);
    await createPromotion(values);
    setIsMsgSentProgress(false);
    reset({ intialValues });
  };

  return (
    <div className={'w-2/6 mt-8 mx-auto bg-white'}>
      <form className={'border rounded-sm'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'text-right p-2'}>
          <button onClick={() => setShowAdd(false)}>
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
              htmlFor={'promotionLabel'}
            >
              {'Promotion Label'}
            </label>
            <input
              id='promotionLabel'
              type='text'
              {...register('promotionLabel', { required: true })}
              className={
                'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
              }
              defaultValue={intialValues.promotionLabel}
            />
            <ErrorMessage
              errors={errors}
              name='promotionLabel'
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
              htmlFor={'promotionDiscount'}
            >
              {'Promotion Discount'}
            </label>
            <input
              id='promotionDiscount'
              type='text'
              {...register('promotionDiscount', { required: true })}
              className={
                'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
              }
              defaultValue={intialValues.promotionDiscount}
            />
            <ErrorMessage
              errors={errors}
              name='promotionDiscount'
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
                <div className={'text-base font-bold'}>ADD PROMOTION</div>
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

export default AddPromotion;
