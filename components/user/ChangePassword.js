import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { signOut } from 'next-auth/client';

const ChangePassword = () => {
  const router = useRouter();
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

  async function changePassword(values) {
    const body = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      newPassword2: values.newPassword2,
    };
    //TODO pass check
    const response = await axios.patch('/api/user/changePassword', body);
    setIsMsgFail(true);
    setIsMsgSentProgress(false);
    return response;
  }

  const intialValues = {
    oldPassword: '',
    newPassword: '',
    newPAssword2: '',
  };
  const onSubmit = async (values) => {
    setIsMsgSentProgress(true);
    try {
      await changePassword(values);
    } catch (error) {
      console.log(error);
    }

    setIsMsgSentProgress(false);
    reset({ intialValues });
    const data = await signOut({ redirect: false, callbackUrl: '/signIn' });
    router.replace(data.url);
  };

  return (
    <div>
      <div className={'mt-8 mx-auto border rounded-sm bg-white'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex flex-col py-8 px-4 text-black'}>
            <div className={'mb-4 text-[#F27A1A] text-lg font-bold'}>
              Şifre Güncelleme
            </div>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-sm font-bold'}
                htmlFor={'oldPassword'}
              >
                {'Şu Anki Şifre'}
              </label>
              <input
                {...register('oldPassword', { required: true })}
                className={'mb-2 px-3 py-2 bg-white border rounded-sm'}
                defaultValue={intialValues.oldPassword}
              />
              {errors.oldPassword && <span>This field is required</span>}
            </div>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-sm font-bold'}
                htmlFor={'newPassword'}
              >
                {'Yeni Şifre'}
              </label>
              <input
                {...register('newPassword', { required: true })}
                className={'mb-2 px-3 py-2 bg-white border rounded-sm '}
                defaultValue={intialValues.newPassword}
              />
              {errors.newPassword && <span>This field is required</span>}
            </div>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-sm font-bold'}
                htmlFor={'newPassword2'}
              >
                {'Yeni Şifre (Tekrar)'}
              </label>
              <input
                {...register('newPassword2', { required: true })}
                className={'mb-2 px-3 py-2 bg-white border rounded-sm'}
                defaultValue={intialValues.newPassword2}
              />
              {errors.newPassword2 && <span>This field is required</span>}
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
                  'w-full bg-white text-primary hover:text-white border border-primary hover:bg-primary rounded py-3 justify-center tracking-wide transition duration-200 ease-in disabled:bg-gray-300 ' +
                  (isMsgFail ? 'hidden' : '')
                }
                type='submit'
                disabled={isSubmitting}
              >
                {!isMsgSentProgress ? (
                  <div className={'text-sm '}>GÜNCELLE</div>
                ) : (
                  <div
                    style={{ borderTopColor: 'transparent' }}
                    className='border-solid animate-spin rounded-full border-purple-600 border-4 h-6 w-6'
                  ></div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
