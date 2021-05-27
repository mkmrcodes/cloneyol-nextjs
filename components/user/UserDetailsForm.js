import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import {
  gsmOptions,
  birthdayOptions,
  DropdownIndicator,
  styles4Select,
} from '../../utils/constants';

const UserDetailsForm = (props) => {
  const router = useRouter();
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  async function createUserProfile(values) {
    const response = await axios.get('/api/user/getUserId');
    console.log(response.data);
    const userId = response.data.data.userId;
    const body = {
      id: userId,
      name: values.name,
      surname: values.surname,
      email: values.email,
      gsmNumber: values.areaCode.value + values.gsmNumber,
      birthDay: `${values.day.value}-${values.month.value}-${values.year.value}`,
      gender: values.gender,
    };
    await axios.post('/api/user/createProfile', body);

    return;
  }

  const intialValues = {
    name: '',
    surname: '',
    email: '',
    areaCode: { value: '+90', label: '+90' },
    gsmNumber: '',
    day: { value: '1', label: '1' },
    month: { value: '1', label: '1' },
    year: { value: '1', label: '1' },
    gender: '',
  };
  const onSubmit = async (values) => {
    setIsMsgSentProgress(true);
    try {
      await createUserProfile(values);
    } catch (error) {
      console.log(error);
    }
    setIsMsgSentProgress(false);
    // reset({ intialValues });
    // const data = await signOut({ redirect: false, callbackUrl: '/signIn' });
    // router.replace(data.url);
  };

  return (
    <div>
      <div className={'mt-8 mx-auto border rounded-lg bg-white'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex flex-col py-8 px-4 text-black'}>
            <div className={'mb-4 text-[#F27A1A] text-base font-bold'}>
              Üyelik Bilgilerim
            </div>
            <div className={'flex'}>
              <div className={'w-3/6 mx-auto flex flex-col p-2'}>
                <label className={'mb-2 text-sm font-bold'} htmlFor={'name'}>
                  {'Ad'}
                </label>
                <input
                  {...register('name', { required: 'Bu alan zorunludur' })}
                  className={
                    'px-3 py-2 text-sm bg-white border rounded-sm focus:border-gray-200 focus:outline-none'
                  }
                  defaultValue={intialValues.name}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />

                <ErrorMessage
                  errors={errors}
                  name='name'
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
              <div className={'w-3/6 mx-auto flex flex-col p-2'}>
                <label className={'mb-2 text-sm font-bold'} htmlFor={'surname'}>
                  {'Soyad'}
                </label>
                <input
                  {...register('surname', { required: 'Bu alan zorunludur' })}
                  className={
                    'px-3 py-2 text-sm bg-white border rounded-sm focus:border-gray-200 focus:outline-none'
                  }
                  defaultValue={intialValues.surname}
                  aria-invalid={errors.surname ? 'true' : 'false'}
                />
                <ErrorMessage
                  errors={errors}
                  name='surname'
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
            </div>

            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label className={'mb-2 text-sm font-bold'} htmlFor={'email'}>
                {'E-Posta'}
              </label>
              <input
                {...register('email', {
                  required: 'Bu alan zorunludur',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçersiz E-Posta Adresi',
                  },
                })}
                className={
                  'px-3 py-2 bg-white text-sm border rounded-sm focus:border-gray-200 focus:outline-none'
                }
                defaultValue={intialValues.email}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              <ErrorMessage
                errors={errors}
                name='email'
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p
                      key={type}
                      className={'mt-1 text-xs font-bold text-red-700'}
                      role='alert'
                    >
                      {message}
                    </p>
                  ))
                }
              />
            </div>
            <div className={'flex'}>
              <div className={'w-2/6 mx-auto flex flex-col p-2 text-gray-700'}>
                <label
                  className={'mb-2 text-sm font-bold'}
                  htmlFor={'areaCode'}
                >
                  Cep Telefonu
                </label>
                <Controller
                  render={({ field }) => (
                    <Select
                      styles={styles4Select}
                      inputId='areaCode'
                      options={gsmOptions}
                      components={{ DropdownIndicator }}
                      maxMenuHeight={250}
                      {...field}
                    />
                  )}
                  name='areaCode'
                  rules={{ required: 'Bu alan zorunludur' }}
                  control={control}
                  defaultValue={intialValues.areaCode}
                  aria-invalid={errors.areaCode ? 'true' : 'false'}
                />

                <ErrorMessage
                  errors={errors}
                  name='areaCode'
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
              <div className={'w-4/6 mx-auto flex flex-col p-2'}>
                <label
                  className={'mb-2 text-sm font-bold text-white '}
                  htmlFor={'gsmNumber'}
                >
                  {'gsmNumber'}
                </label>
                <input
                  {...register('gsmNumber', {
                    required: 'Bu alan zorunludur',
                    pattern: {
                      value: /^\d+$/,
                      message: 'Sayı giriniz.',
                    },
                    maxLength: {
                      value: 10,
                      message:
                        '10 haneli ve geçerli bir telefon numarası giriniz.',
                    },
                    minLength: {
                      value: 10,
                      message:
                        '10 haneli ve geçerli bir telefon numarası giriniz.',
                    },
                  })}
                  className={
                    'px-3 py-2 text-sm bg-white border rounded-sm focus:border-gray-200 focus:outline-none'
                  }
                  defaultValue={intialValues.gsmNumber}
                  aria-invalid={errors.gsmNumber ? 'true' : 'false'}
                />
                <ErrorMessage
                  errors={errors}
                  name='gsmNumber'
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p
                        key={type}
                        className={'mt-1 text-xs font-bold text-red-700'}
                        role='alert'
                      >
                        {message}
                      </p>
                    ))
                  }
                />
              </div>
            </div>
            <div className={'flex'}>
              <div className={'w-2/6 mx-auto flex flex-col p-2 text-gray-700'}>
                <label className={'mb-2 text-sm font-bold'} htmlFor={'day'}>
                  Doğum Tarihiniz
                </label>
                <Controller
                  render={({ field }) => (
                    <Select
                      styles={styles4Select}
                      inputId='day'
                      options={birthdayOptions.day()}
                      components={{ DropdownIndicator }}
                      maxMenuHeight={250}
                      {...field}
                    />
                  )}
                  name='day'
                  rules={{ required: 'Bu alan zorunludur' }}
                  control={control}
                  defaultValue={intialValues.day}
                  aria-invalid={errors.day ? 'true' : 'false'}
                />

                <ErrorMessage
                  errors={errors}
                  name='day'
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
              <div className={'w-2/6 mx-auto flex flex-col p-2 text-gray-700'}>
                <label
                  className={'mb-2 text-sm font-bold text-white'}
                  htmlFor={'month'}
                >
                  Month
                </label>
                <Controller
                  render={({ field }) => (
                    <Select
                      styles={styles4Select}
                      inputId='month'
                      options={birthdayOptions.month()}
                      components={{ DropdownIndicator }}
                      maxMenuHeight={250}
                      {...field}
                    />
                  )}
                  name='month'
                  rules={{ required: 'Bu alan zorunludur' }}
                  control={control}
                  defaultValue={intialValues.month}
                  aria-invalid={errors.month ? 'true' : 'false'}
                />

                <ErrorMessage
                  errors={errors}
                  name='month'
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
              <div className={'w-2/6 mx-auto flex flex-col p-2 text-gray-700'}>
                <label
                  className={'mb-2 text-sm font-bold text-white'}
                  htmlFor={'year'}
                >
                  Year
                </label>
                <Controller
                  render={({ field }) => (
                    <Select
                      styles={styles4Select}
                      inputId='year'
                      options={birthdayOptions.year()}
                      components={{ DropdownIndicator }}
                      maxMenuHeight={250}
                      {...field}
                    />
                  )}
                  name='year'
                  rules={{ required: 'Bu alan zorunludur' }}
                  control={control}
                  defaultValue={intialValues.year}
                  aria-invalid={errors.year ? 'true' : 'false'}
                />

                <ErrorMessage
                  errors={errors}
                  name='year'
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
            </div>
            <div className={'w-full mx-auto flex flex-col p-2 text-gray-700'}>
              <span className='mb-2 text-sm font-bold'>Cinsiyet</span>
              <div>
                <label
                  className={'inline-flex items-center'}
                  htmlFor={'gender'}
                >
                  <input
                    type='radio'
                    {...register('gender')}
                    className={'form-radio'}
                    value='Kadın'
                  />
                  <span className='ml-2 text-sm'>Kadın</span>
                </label>
                <label
                  className={'inline-flex items-center ml-6'}
                  htmlFor={'gender'}
                >
                  <input
                    type='radio'
                    {...register('gender')}
                    className={'form-radio'}
                    value='Erkek'
                  />
                  <span className='ml-2 text-sm'>Erkek</span>
                </label>
              </div>
            </div>

            <div className={'mt-4 text-center'}>
              {isMsgFail ? (
                <div
                  className={
                    'w-full py-2 px-6 bg-red-500 text-white border rounded-md text-center'
                  }
                  role='alert'
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

export default UserDetailsForm;
