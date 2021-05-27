import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useSWR from 'swr';
import FormikControl from './FormikControl';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../utils/constants';

const EditProductForm = ({ data }) => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false);
  const [isMsgSuccess, setIsMsgSuccess] = useState(false);
  const [isMsgFail, setIsMsgFail] = useState(false);

  const [selectedFile, setSelectedFile] = useState(undefined);
  const notify = () => toast.success('PRODUCT UPDATED!');
  const fileUploadHandler = async () => {
    console.log(selectedFile);
    const fileData = new FormData();
    fileData.append('productImg', selectedFile, selectedFile.name);

    const res = await axios.post(`${nestApiUrl}/upload`, fileData);
    console.log(res.data);
  };

  const initialValues = {
    productCode: data.productCode,
    productKind: data.productKind,
    productName: data.productName,
    productPrice: data.productPrice,
    productImg: data.productImg,
    check: '',
  };
  const validationSchema = Yup.object({
    productCode: Yup.string().required('* Required'),
    productKind: Yup.string().required('* Required'),
    productName: Yup.string().required('* Required'),
    productPrice: Yup.number().required('* Required'),
  });
  const saveProduct = async (values) => {
    const { productCode, productKind, productName, productPrice } = values;
    const productImg = `/images/${selectedFile.name}`;
    console.log('productimg: ', productImg);
    console.log('values', values);
    const response = await axios.patch(
      `${nestApiUrl}/items/${data.id}/update`,
      {
        productCode,
        productKind,
        productName,
        productPrice,
        productImg,
      }
    );

    // const response = await fetch(`http://localhost:3001/items/${data.id}/update`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     productCode,
    //     productKind,
    //     productName,
    //     productPrice,
    //     productImg,
    //   }),
    // });
    fileUploadHandler();
    return response.data;
  };
  const onSubmit = async (values, { resetForm }) => {
    if (values.check !== '') {
      //bot check :)
      return;
    }
    setIsMsgSentProgress(true);
    const result = await saveProduct(values);
    console.log(result);
    setIsMsgSentProgress(false);
    setIsMsgSuccess(true);
    resetForm();
  };

  return (
    <div
      className={
        'w-full flex flex-col items-center m-0 py-12 bg-[#333A3F] text-white'
      }
    >
      <div className={'p-4 text-2xl md:text-3xl'}>Edit Product</div>
      <div className={'w-full'}>
        <div className={'mx-16'}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={true}
          >
            {(formik) => (
              <Form>
                <div className={'flex flex-col mx-4'}>
                  <div className={'w-full'}>
                    <FormikControl
                      control='input'
                      type='text'
                      label='Product Code'
                      name='productCode'
                    />
                  </div>
                  <div className={'w-full'}>
                    <FormikControl
                      control='input'
                      type='text'
                      label='Product Kind'
                      name='productKind'
                    />
                  </div>
                  <div className={'w-full'}>
                    <FormikControl
                      control='input'
                      type='text'
                      label='Product Name'
                      name='productName'
                    />
                  </div>
                  <div className={'w-full'}>
                    <FormikControl
                      style={{ MozAppearance: 'textfield' }}
                      control='input'
                      type='number'
                      label='Product Price'
                      name='productPrice'
                    />
                  </div>
                </div>
                <div className={'flex flex-col mx-4'}>
                  <input
                    id='file'
                    type='file'
                    label='Product Image'
                    name='productImg'
                    onChange={(event) => {
                      setSelectedFile(event.target.files[0]);
                    }}
                  />
                  <div className={'hidden'}>
                    <FormikControl
                      control='input'
                      type='text'
                      label='check'
                      name='check'
                    />
                  </div>
                  {isMsgFail ? (
                    <div
                      className={
                        'w-full p-2 mt-8 bg-red-500 text-white border rounded-md text-center'
                      }
                    >
                      Hata! Lütfen daha sonra tekrar deneyiniz
                    </div>
                  ) : null}
                  (
                  <div className={'mt-8 text-center'}>
                    <button
                      className={
                        'w-80 font-body bg-[#22C35E] text-[#4b4f56] py-2 px-6 rounded inline-flex justify-center tracking-wide disabled:bg-gray-300'
                      }
                      type='submit'
                      disabled={!formik.isValid}
                      onClick={notify}
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
                  )
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
