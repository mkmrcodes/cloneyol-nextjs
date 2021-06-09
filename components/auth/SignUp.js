import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AiFillGoogleSquare } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { ImEyeBlocked } from 'react-icons/im';
import { ImEye } from 'react-icons/im';
import MyDialog from '../Dialog';

const SignUp = () => {
  const router = useRouter();
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tabIdx, setTabIdx] = useState(0);
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
    if (!result.error) {
      router.replace('/');
    }
  }

  async function createUser(values) {
    let { email, password } = values;

    const body = {
      email: email,
      password: password,
    };
    const response = await axios.post('/api/auth/signup', body).catch((e) => {
      setIsMsgFail(true);
      setIsMsgSentProgress(false);
    });
    return response.data;
  }
  async function createProfile(userId, values) {
    const userConn = await axios.get('http://ip-api.com/json').catch((e) => {
      console.log('ipdetection error:', e);
    });

    const body = {
      id: userId,
      name: '',
      surname: '',
      gsmNumber: '',
      birthday: '',
      gender: values.gender,
      identityNumber: '',
      ip: userConn.data.query,
      city: userConn.data.city,
      country: userConn.data.country,
      zipCode: userConn.data.zip,
      email: values.email,
    };
    console.log('profilebody: ', body);
    const response = await axios
      .post('/api/user/createProfile', body)
      .catch((e) => {
        setIsMsgFail(true);
        setIsMsgSentProgress(false);
      });
    return response.data;
  }

  const intialValues = {
    email: '',
    password: '',
  };
  const onSubmit = async (values) => {
    console.log('formvalues:', values);
    setIsMsgSentProgress(true);
    let user;
    try {
      user = await createUser(values);
    } catch (error) {
      console.log('createUser error');
    }
    try {
      console.log('userdata', user.data);
      await createProfile(user.data.userId, values);
    } catch (error) {
      console.log('createProfile error', error);
    }
    try {
      await signInUser(values);
    } catch (error) {
      console.log('signinuser error');
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
                <div className={'text-xs text-gray-500'}>
                  Şifreniz en az 8 karakter olmalı, harf ve rakam içermelidir.
                </div>
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
              <div className={'w-full mx-auto flex flex-col p-2 text-gray-700'}>
                <span className='mb-2 text-sm '>Cinsiyet (Opsiyonel)</span>
                <div className={'flex justify-center items-center'}>
                  <label className={'w-3/6 '}>
                    <input
                      id='radio1'
                      type='radio'
                      name='gender'
                      {...register('gender')}
                      className={'hidden'}
                      value='Kadın'
                    />
                    <div
                      className={
                        'p-2 text-base text-gray-500 rounded-sm border border-gray-300 label-checked:border-primary label-checked:text-primary label-checked:font-bold text-center'
                      }
                    >
                      Kadın
                    </div>
                  </label>
                  <label className={'w-3/6'}>
                    <input
                      id='radio2'
                      type='radio'
                      name='gender'
                      {...register('gender')}
                      className={'hidden'}
                      value='Erkek'
                    />
                    <div
                      className={
                        'p-2 text-base text-gray-500 rounded-sm border border-gray-300 label-checked:border-primary label-checked:text-primary label-checked:font-bold text-center'
                      }
                    >
                      Erkek
                    </div>
                  </label>
                </div>
              </div>
              <div className={'w-full mx-auto p-2'}>
                <label
                  className={
                    'flex justify-center items-center mb-2 text-black text-sm cursor-pointer '
                  }
                  htmlFor={'newsletter'}
                >
                  <input
                    id='newsletter'
                    type='checkbox'
                    {...register('newsletter', { required: true })}
                    className={
                      'mr-3 border-gray-300 rounded-sm checked:bg-primary checked:border-primary checked:focus:bg-primary checked:hover:bg-primary hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                    }
                    value='false'
                  />
                  <div
                    className={
                      'text-xs label-cb-checked:font-bold text-justify'
                    }
                  >
                    Kampanyalardan haberdar olmak için elektronik ileti almak
                    istiyorum.
                  </div>
                </label>
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
                    <div className={'text-base font-bold'}>ÜYE OL</div>
                  ) : (
                    <div
                      style={{ borderTopColor: 'transparent' }}
                      className='border-solid animate-spin rounded-full border-gray-200 border-4 h-6 w-6'
                    ></div>
                  )}
                </button>
                <div className={'mt-4 text-xs text-gray-500 text-justify'}>
                  Üye Ol'a basarak{' '}
                  <span
                    className={'underline text-black cursor-pointer'}
                    onClick={() => {
                      setTabIdx(0);
                      setShowModal(!showModal);
                    }}
                  >
                    Üyelik Koşulları
                  </span>
                  'nı ve{' '}
                  <span
                    className={'underline text-black cursor-pointer'}
                    onClick={() => {
                      setTabIdx(1);
                      setShowModal(!showModal);
                    }}
                  >
                    Kişisel Verilerin Korunması Metni
                  </span>
                  'ni kabul ediyorum.
                </div>
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
                      <h4 className={'text-xs text-gray-400'}>ile kaydol</h4>
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
                      <h4 className={'text-xs text-gray-400'}>ile kaydol</h4>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <MyDialog
        isOpen={showModal}
        setIsOpen={setShowModal}
        tabIdx={tabIdx}
        setTabIdx={setTabIdx}
      />
    </div>
  );
};

export default SignUp;
