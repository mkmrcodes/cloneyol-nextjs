import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AiFillGoogleSquare } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { ImEyeBlocked } from 'react-icons/im';
import { ImEye } from 'react-icons/im';
import axios from 'axios';
import { nestApiUrl } from '../../utils/constants';

const SignIn = () => {
  const router = useRouter();
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

  async function signInUser(values) {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    const user = await axios.get(`${nestApiUrl}/users/check/${values.email}`);

    if (!result.error) {
      if (user.data.isAdmin) {
        router.replace('/admin');
      } else if (user.isMerchant) {
        router.replace('/merchant');
      }
      router.replace('/basket');
    }
  }

  const intialValues = {
    email: '',
    password: '',
  };
  const onSubmit = async (values) => {
    setIsMsgSentProgress(true);
    try {
      await signInUser(values);
    } catch (error) {
      console.log(error);
    }

    setIsMsgSentProgress(false);
    reset({ intialValues });
  };

  return (
    <div className={'bg-[#FAFAFA]'}>
      <div className={'w-full mx-auto bg-white'}>
        <div className={''}>
          <form
            className={'border-r border-l border-b rounded-b-sm'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={'flex flex-col px-8 py-6 text-black'}>
              <div className={'w-full mx-auto flex flex-col p-2'}>
                <label
                  className={'mb-2 text-black text-sm font-bold'}
                  htmlFor={'email'}
                >
                  {'E-Posta'}
                </label>
                <input
                  type='text'
                  className={
                    'text-sm py-2.5 border-gray-200 rounded-sm focus:border-gray-300 focus:ring-0'
                  }
                  {...register('email', { required: true })}
                  defaultValue={intialValues.email}
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
              <div className={'w-full mx-auto flex flex-col p-2'}>
                <label
                  className={'mb-2 text-black text-sm font-bold'}
                  htmlFor={'password'}
                >
                  {'Şifre'}
                </label>
                <div className={'relative'}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: true })}
                    className={
                      'w-full text-sm py-2.5 border-gray-200 rounded-sm focus:border-gray-300 focus:ring-0'
                    }
                    defaultValue={intialValues.password}
                  />
                  <div
                    className={'absolute top-3 right-5'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ImEye /> : <ImEyeBlocked />}
                  </div>
                </div>
                <Link href='/forgotpassword'>
                  <div className={'py-2 text-right text-sm underline'}>
                    Şifremi Unuttum
                  </div>
                </Link>
                <ErrorMessage
                  errors={errors}
                  name='password'
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
                    'w-full bg-primary text-white mt-2 py-2 px-6 rounded-sm inline-flex justify-center tracking-wide disabled:bg-gray-300'
                  }
                  type='submit'
                  disabled={isSubmitting}
                >
                  {!isMsgSentProgress ? (
                    <div className={'text-base font-bold'}>GİRİŞ YAP</div>
                  ) : (
                    <div
                      style={{ borderTopColor: 'transparent' }}
                      className='border-solid animate-spin rounded-full border-gray-200 border-4 h-6 w-6'
                    ></div>
                  )}
                </button>

                <div className={'mt-4 flex'}>
                  <a
                    href='http://facebook.com'
                    className={
                      'w-3/6 bg-grey-light mr-1 border text-sm py-1 px-4 rounded inline-flex items-center'
                    }
                  >
                    <AiFillFacebook className={'w-8 h-8 mr-2 text-[#4C6EA8]'} />
                    <div className={'flex flex-col text-left'}>
                      <h1>Facebook</h1>
                      <h4 className={'text-xs text-gray-400'}>ile giriş yap</h4>
                    </div>
                  </a>

                  <a
                    href='http://www.google.com'
                    className={
                      'w-3/6 bg-grey-light ml-1 border text-sm py-1 px-4 rounded inline-flex items-center'
                    }
                  >
                    <AiFillGoogleSquare
                      className={'w-8 h-8 mr-2 text-[#F14236]'}
                    />
                    <div className={'flex flex-col text-left'}>
                      <h1>Google</h1>
                      <h4 className={'text-xs text-gray-400'}>ile giriş yap</h4>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
