import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nestApiUrl } from '../../utils/constants';
import { CgCloseR } from 'react-icons/cg';

const AddProduct = ({ setShowAdd, getProducts }) => {
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

  const fileUploadHandler = async (image) => {
    const fileData = new FormData();
    fileData.append('productImg', image, image.name);

    const res = await axios
      .post(`${nestApiUrl}/upload`, fileData)
      .catch((e) => {
        setIsMsgFail(true);
        setIsMsgSentProgress(false);
      });
  };
  const saveProduct = async (values) => {
    let {
      code,
      name,
      slug,
      brand,
      oldPrice,
      price,
      discountRatio,
      discountPrice,
      isCargoFree,
      image,
      category,
      promotion,
      basketLimit,
      stock,
      merchant,
    } = values;
    console.log(image[0]);
    fileUploadHandler(image[0]);
    const productImg = `/images/${image[0].name}`;
    const body = {
      code: code,
      name: name,
      slug: slug,
      brand: brand,
      oldPrice: oldPrice,
      price: price,
      discountRatio: discountRatio,
      discountPrice: discountPrice,
      isCargoFree: isCargoFree,
      image: productImg,
      category: category,
      promotion: promotion,
      basketLimit: basketLimit,
      stock: stock,
      merchant: merchant,
    };
    console.log(body);
    await axios.post(`${nestApiUrl}/items`, body).catch((e) => {
      setIsMsgFail(true);
      setIsMsgSentProgress(false);
    });
    getProducts();
  };

  const intialValues = {
    code: '',
    name: '',
    brand: '',
    oldPrice: '',
    price: '',
    discountRatio: '',
    discountPrice: '',
    isCargoFree: '',
    image: '',
    category: '',
    promotion: '',
    basketLimit: '',
    stock: '0',
    merchant: '',
  };
  const onSubmit = async (values) => {
    console.log(values);
    setIsMsgSentProgress(true);
    await saveProduct(values);
    setIsMsgSentProgress(false);
    reset({ intialValues });
  };

  return (
    <div className={'w-3/4 mt-8 mx-auto '}>
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
                htmlFor={'code'}
              >
                {'Code'}
              </label>
              <input
                id='code'
                type='text'
                {...register('code', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.code}
              />
              <ErrorMessage
                errors={errors}
                name='code'
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
                htmlFor={'name'}
              >
                {'Name'}
              </label>
              <input
                id='name'
                type='text'
                {...register('name', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.name}
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
            <div className={'w-full mx-auto flex flex-col p-2'}>
              <label
                className={'mb-2 text-black text-sm font-bold'}
                htmlFor={'slug'}
              >
                {'Slug'}
              </label>
              <input
                id='slug'
                type='text'
                {...register('slug', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.slug}
              />
              <ErrorMessage
                errors={errors}
                name='slug'
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
                htmlFor={'brand'}
              >
                {'Brand Id'}
              </label>
              <input
                id='brand'
                type='number'
                {...register('brand', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                defaultValue={intialValues.brand}
              />
              <ErrorMessage
                errors={errors}
                name='brand'
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
                htmlFor={'stock'}
              >
                {'Stock'}
              </label>
              <input
                id='stock'
                type='number'
                step='1'
                {...register('stock', {
                  required: 'Required!',
                  min: 0,
                  max: 9999,
                })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                onChange={(e) => {
                  parseInt(e.target.value);
                }}
                defaultValue={intialValues.stock}
              />
              <ErrorMessage
                errors={errors}
                name='stock'
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
                htmlFor={'oldPrice'}
              >
                {'Old Price'}
              </label>
              <input
                id='oldPrice'
                type='text'
                {...register('oldPrice', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.oldPrice}
              />
              <ErrorMessage
                errors={errors}
                name='oldPrice'
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
                htmlFor={'price'}
              >
                {'Price'}
              </label>
              <input
                id='price'
                type='number'
                step='.01'
                {...register('price', {
                  required: 'Required!',
                  min: 1,
                  max: 9999,
                })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                onChange={(e) => {
                  parseFloat(e.target.value).toFixed(2);
                }}
                defaultValue={intialValues.price}
              />
              <ErrorMessage
                errors={errors}
                name='price'
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
                htmlFor={'discountRatio'}
              >
                {'Discount Ratio'}
              </label>
              <input
                id='discountRatio'
                type='number'
                {...register('discountRatio', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                defaultValue={intialValues.discountRatio}
              />
              <ErrorMessage
                errors={errors}
                name='discountRatio'
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
                htmlFor={'discountPrice'}
              >
                {'Discount Price'}
              </label>
              <input
                id='discountPrice'
                type='number'
                step='.01'
                {...register('discountPrice', {
                  required: 'Required!',
                  min: 1,
                  max: 9999,
                })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                style={{ MozAppearance: 'textfield' }}
                onChange={(e) => {
                  parseFloat(e.target.value).toFixed(2);
                }}
                defaultValue={intialValues.discountPrice}
              />
              <ErrorMessage
                errors={errors}
                name='discountPrice'
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
                htmlFor={'category'}
              >
                {'Category'}
              </label>
              <input
                id='category'
                type='text'
                {...register('category', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.category}
              />
              <ErrorMessage
                errors={errors}
                name='category'
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
                htmlFor={'promotion'}
              >
                {'Promotion'}
              </label>
              <input
                id='promotion'
                type='text'
                {...register('promotion', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.promotion}
              />
              <ErrorMessage
                errors={errors}
                name='promotion'
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
                htmlFor={'basketLimit'}
              >
                {'Basket Limit'}
              </label>
              <input
                id='basketLimit'
                type='text'
                {...register('basketLimit', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.basketLimit}
              />
              <ErrorMessage
                errors={errors}
                name='basketLimit'
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
                htmlFor={'isCargoFree'}
              >
                {'Cargo Free'}
              </label>
              <input
                id='isCargoFree'
                type='text'
                {...register('isCargoFree', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.isCargoFree}
              />
              <ErrorMessage
                errors={errors}
                name='isCargoFree'
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
                htmlFor={'merchant'}
              >
                {'Merchant'}
              </label>
              <input
                id='merchant'
                type='text'
                {...register('merchant', { required: 'Required!' })}
                className={
                  'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                defaultValue={intialValues.merchant}
              />
              <ErrorMessage
                errors={errors}
                name='merchant'
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
          <div className={'w-full flex flex-col items-center p-2'}>
            <label
              className={'mb-2 text-black text-sm font-bold'}
              htmlFor={'image'}
            >
              {'Image'}
            </label>
            <input
              id='image'
              type='file'
              accept='image/*'
              {...register('image', { required: 'Required!' })}
              className={
                'mr-3 border-gray-300 rounded-sm hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
              }
              defaultValue={intialValues.image}
            />
            <ErrorMessage
              errors={errors}
              name='image'
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
                <div className={'text-base font-bold'}>ADD PRODUCT</div>
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

export default AddProduct;
