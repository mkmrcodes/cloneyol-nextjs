import axios from 'axios';
import { useReducer, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../../../utils/constants';
import AdminSidePanel from '../../../components/admin/AdminSidePanel';
import { CgCloseR } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import AddProduct from '../../../components/admin/AddProduct';
import EditProduct from '../../../components/admin/EditProduct';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GETPRODUCTS':
      return action.payload;
    default:
      return state;
  }
};

export default function ProductsPage({ data }) {
  const [state, dispatch] = useReducer(reducer, data);
  const [productData, setProductData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  async function deleteHandler(id) {
    await axios.delete(`${nestApiUrl}/items/${id}`).catch((e) => {
      toast.error('ERROR!');
    });
    await getProducts();
  }
  async function getProducts() {
    const response = await axios.get(`${nestApiUrl}/items`).catch((e) => {
      toast.error('ERROR!');
    });
    toast.success('DONE!');
    const newData = response.data;
    dispatch({ type: 'GETPRODUCTS', payload: newData });
  }

  return (
    <div className={'w-full h-screen'}>
      <div className={'w-full mx-auto'}>
        <div className={'flex'}>
          <AdminSidePanel />
          <div className={'flex-1'}>
            <div
              className={
                'w-full h-screen flex flex-col justify-start space-y-4 shadow-inner bg-[#F3F8FB]'
              }
            >
              <div className={'flex justify-end m-2'}>
                <button onClick={() => setShowAdd(!showAdd)}>
                  <MdAddCircleOutline className={'w-8 h-8 text-primary'} />
                </button>
              </div>
              <div>
                {showAdd && (
                  <AddProduct
                    setShowAdd={setShowAdd}
                    getProducts={getProducts}
                  />
                )}
              </div>
              <div>
                {showEdit && (
                  <EditProduct
                    data={productData}
                    setShowEdit={setShowEdit}
                    getProducts={getProducts}
                  />
                )}
              </div>
              <div className='mx-auto mt-4 shadow-lg overflow-hidden rounded-sm'>
                <table
                  className={
                    'mx-auto table-auto max-w-[1000px] overflow-x-scroll'
                  }
                >
                  <thead>
                    <tr className={'text-xs text-white bg-primary text-center'}>
                      <th scope='col' className={'border p-2'}>
                        Id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Code
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Name
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Slug
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Brand
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Old Price
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Price
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Discount Ratio
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Discount Price
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Cargo Free
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Image
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Category
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Promotion
                      </th>

                      <th scope='col' className={'border p-2'}>
                        Basket Limit
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Stock
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Merchant
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Type
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Created At
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Updated At
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Version
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Edit
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={
                      'max-h-[600px] max-w-[1000px] overflow-y-scroll overflow-x-scroll text-xs'
                    }
                  >
                    {state.map((item) => (
                      <tr key={item.id} className={'leading-normal'}>
                        <td className={'border p-2'}>{item.id}</td>
                        <td className={'border p-2'}>{item.code}</td>
                        <td className={'border p-2'}>{item.name}</td>
                        <td className={'border p-2'}>{item.slug}</td>
                        <td className={'border p-2'}>{item.brand}</td>
                        <td className={'border p-2'}>{item.oldPrice}</td>
                        <td className={'border p-2'}>{item.price}</td>
                        <td className={'border p-2'}>{item.discountRatio}</td>
                        <td className={'border p-2'}>{item.discountPrice}</td>
                        <td className={'border p-2'}>{item.isCargoFree}</td>
                        <td className={'border p-2'}>{item.image}</td>
                        <td className={'border p-2'}>{item.category}</td>
                        <td className={'border p-2'}>{item.promotion}</td>
                        <td className={'border p-2'}>{item.basketLimit}</td>
                        <td className={'border p-2'}>{item.stock}</td>
                        <td className={'border p-2'}>{item.merchant}</td>
                        <td className={'border p-2'}>{item.itemType}</td>
                        <td className={'border p-2'}>{item.createdAt}</td>
                        <td className={'border p-2'}>{item.updatedAt}</td>
                        <td className={'border p-2'}>{item.version}</td>

                        <td className={'border p-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => {
                              setProductData(item);
                              setShowEdit(true);
                            }}
                          >
                            <div className={'cursor-pointer'}>
                              <BiEdit className={'w-6 h-6 text-red-600'} />
                            </div>
                          </button>
                        </td>
                        <td className={'border px-4 py-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => deleteHandler(item.id)}
                          >
                            <div className={'space-x-2 '}>
                              <CgCloseR className={'w-5 h-5 text-red-600'} />
                            </div>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(`${nestApiUrl}/items`);
  const data = response.data;
  return { props: { data } };
}
