import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nestApiUrl } from '../../utils/constants';
import { CgCloseR } from 'react-icons/cg';

const AddCat = ({ setShowAdd, getCats }) => {
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
    catLabel: '',
    catSlug: '',
    parentCatId: '',
    attr1Id: 0,
    attr1Label: '',
    attr2Id: 0,
    attr2Label: '',
    attr3Id: 0,
    attr3Label: '',
  };
  const createCat = async (values) => {
    console.log('values', values);
    const {
      catLabel,
      catSlug,
      parentCatId,
      attr1Id,
      attr1Label,
      attr2Id,
      attr2Label,
      attr3Id,
      attr3Label,
    } = values;

    const body = {
      catLabel,
      catSlug,
      parentCatId,
      attr1Id,
      attr1Label,
      attr2Id,
      attr2Label,
      attr3Id,
      attr3Label,
    };
    await axios.post(`${nestApiUrl}/category`, body).catch((e) => {
      setIsMsgFail(true);
      setIsMsgSentProgress(false);
    });
    getCats();
  };

  const onSubmit = async (values) => {
    if (Object.keys(errors).length !== 0) {
      console.log('form error:', errors);
    }
    setIsMsgSentProgress(true);
    await createCat(values);
    setIsMsgSentProgress(false);
    reset({ intialValues });
  };

  return (
    <div className={'w-3/4 mt-8 mx-auto'}>
      <form
        className={'border rounded-sm mx-8 bg-white'}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <div className={'flex'}>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-black text-sm font-bold'}
                htmlFor={'catLabel'}
              >
                {'CatLabel'}
              </label>
              <input
                id='catLabel'
                type='text'
                {...register('catLabel', { required: true })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.catLabel}
              />
              <ErrorMessage
                errors={errors}
                name='catLabel'
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
                htmlFor={'catSlug'}
              >
                {'CatSlug'}
              </label>
              <input
                id='catSlug'
                type='text'
                {...register('catSlug', { required: true })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.catSlug}
              />
              <ErrorMessage
                errors={errors}
                name='catSlug'
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
          <div className={'flex'}>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-black text-sm font-bold'}
                htmlFor={'parentCatId'}
              >
                {'ParentCatId'}
              </label>
              <input
                id='parentCatId'
                type='number'
                {...register('parentCatId')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                defaultValue={intialValues.parentCatId}
              />
              <ErrorMessage
                errors={errors}
                name='parentCatId'
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
          <div className={'flex'}>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-black text-sm font-bold'}
                htmlFor={'attr1Id'}
              >
                {'Attr1Id'}
              </label>
              <input
                id='attr1Id'
                type='number'
                {...register('attr1Id')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                defaultValue={intialValues.attr1Id}
              />
              <ErrorMessage
                errors={errors}
                name='attr1Id'
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
                htmlFor={'attr1Label'}
              >
                {'Attr1Label'}
              </label>
              <input
                id='attr1Label'
                type='text'
                {...register('attr1Label')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.attr1Label}
              />
              <ErrorMessage
                errors={errors}
                name='attr1Label'
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
          <div className={'flex'}>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-black text-sm font-bold'}
                htmlFor={'attr2Id'}
              >
                {'Attr2Id'}
              </label>
              <input
                id='attr2Id'
                type='number'
                {...register('attr2Id')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                defaultValue={intialValues.attr2Id}
              />
              <ErrorMessage
                errors={errors}
                name='attr2Id'
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
                htmlFor={'attr2Label'}
              >
                {'Attr2Label'}
              </label>
              <input
                id='attr2Label'
                type='text'
                {...register('attr2Label')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.attr2Label}
              />
              <ErrorMessage
                errors={errors}
                name='attr2Label'
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
          <div className={'flex'}>
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-black text-sm font-bold'}
                htmlFor={'attr3Id'}
              >
                {'Attr3Id'}
              </label>
              <input
                id='attr3Id'
                type='number'
                {...register('attr3Id')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                defaultValue={intialValues.attr3Id}
              />
              <ErrorMessage
                errors={errors}
                name='attr3Id'
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
                htmlFor={'attr3Label'}
              >
                {'Attr3Label'}
              </label>
              <input
                id='attr3Label'
                type='text'
                {...register('attr3Label')}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.attr3Label}
              />
              <ErrorMessage
                errors={errors}
                name='attr3Label'
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
          <div className={'text-center'}>
            <button
              className={
                'bg-primary text-white mt-2 py-2 px-6 rounded-sm inline-flex justify-center tracking-wide disabled:bg-gray-300'
              }
              type='submit'
              disabled={isSubmitting}
            >
              {!isMsgSentProgress ? (
                <div className={'text-base font-bold'}>ADD CATEGORY</div>
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

export default AddCat;
