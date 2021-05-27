import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../../utils/constants';

const EditUser = ({ data }) => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

  const updateUser = async (values) => {
    console.log('values', values);
    let { email, isAdmin, isMerchant } = values;

    const body = {
      email,
      isMerchant,
      isAdmin,
    };
    await axios
      .patch(`${nestApiUrl}/users/${data.userId}/update`, body)
      .catch((e) => {
        setIsMsgFail(true);
        toast.error('ERROR');
        setIsMsgSentProgress(false);
      });
    toast.success('USER UPDATED!');
  };

  const onSubmit = async (values) => {
    if (Object.keys(errors).length !== 0) {
      toast.error('ERROR');
    }
    setIsMsgSentProgress(true);
    await updateUser(values);
    setIsMsgSentProgress(false);
  };

  return (
    <div className={'w-2/6 mt-8 mx-auto bg-white'}>
      <form className={'border rounded-sm'} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            'w-full mx-auto flex flex-col justify-center items-center px-8 py-6 text-black'
          }
        >
          <div className={'w-full mx-auto flex flex-col p-2'}>
            <label
              className={'mb-2 text-black text-sm font-bold'}
              htmlFor={'email'}
            >
              {'Email'}
            </label>
            <input
              type='text'
              className={
                'text-sm py-2.5 border-gray-200 rounded-sm focus:border-gray-300 focus:ring-0'
              }
              {...register('email', { required: true })}
              defaultValue={data.email}
            />
            <ErrorMessage
              errors={errors}
              name='email'
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

          <div className={'w-full p-2'}>
            <label
              className={
                'flex justify-start items-center mb-2 text-black text-sm cursor-pointer '
              }
              htmlFor={'isAdmin'}
            >
              <input
                id='isAdmin'
                type='checkbox'
                {...register('isAdmin')}
                className={
                  'mr-3 border-gray-300 rounded-sm checked:bg-primary checked:border-primary checked:focus:bg-primary checked:hover:bg-primary hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultChecked={data.isAdmin}
              />
              <div
                className={'text-xs label-cb-checked:font-bold text-justify'}
              >
                isAdmin
              </div>
            </label>
          </div>
          <div className={'w-full p-2'}>
            <label
              className={
                'flex justify-start items-center mb-2 text-black text-sm cursor-pointer '
              }
              htmlFor={'isMerchant'}
            >
              <input
                id='isMerchant'
                type='checkbox'
                {...register('isMerchant')}
                className={
                  'mr-3 border-gray-300 rounded-sm checked:bg-primary checked:border-primary checked:focus:bg-primary checked:hover:bg-primary hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultChecked={data.isMerchant}
              />
              <div
                className={'text-xs label-cb-checked:font-bold text-justify'}
              >
                isMerchant
              </div>
            </label>
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
                <div className={'text-base font-bold'}>UPDATE USER</div>
              ) : (
                <div
                  style={{ borderTopColor: 'transparent' }}
                  className='border-solid animate-spin rounded-full border-gray-200 border-4 h-6 w-6'
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

export default EditUser;
