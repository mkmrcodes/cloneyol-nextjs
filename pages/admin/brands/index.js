import axios from 'axios';
import { useReducer, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../../../utils/constants';
import AdminSidePanel from '../../../components/admin/AdminSidePanel';
import EditBrand from '../../../components/admin/EditBrand';
import { CgCloseR } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import AddBrand from '../../../components/admin/AddBrand';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GETBRANDS':
      return action.payload;
    default:
      return state;
  }
};

export default function BrandsPage({ data }) {
  const [state, dispatch] = useReducer(reducer, data);
  const [brandData, setBrandData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  async function deleteHandler(id) {
    await axios.delete(`${nestApiUrl}/brands/${id}`).catch((e) => {
      toast.error('ERROR!');
    });
    await getBrands();
  }

  async function getBrands() {
    const response = await axios.get(`${nestApiUrl}/brands`).catch((e) => {
      toast.error('ERROR!');
    });
    toast.success('DONE!');
    const newData = response.data;
    dispatch({ type: 'GETBRANDS', payload: newData });
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
                  <AddBrand setShowAdd={setShowAdd} getBrands={getBrands} />
                )}
              </div>
              <div>
                {showEdit && (
                  <EditBrand
                    data={brandData}
                    setShowEdit={setShowEdit}
                    getBrands={getBrands}
                  />
                )}
              </div>
              <div className='mx-auto mt-4 shadow-lg overflow-hidden rounded-sm'>
                <table className={'mx-auto table-auto'}>
                  <thead>
                    <tr className={'text-sm text-white bg-primary text-center'}>
                      <th scope='col' className={'border p-2'}>
                        id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        brandName
                      </th>
                      <th scope='col' className={'border p-2'}>
                        brandSlug
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Created
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Updated
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Version
                      </th>
                      <th scope='col' className={'border p-2'}>
                        EDIT
                      </th>
                      <th scope='col' className={'border p-2'}>
                        DELETE
                      </th>
                    </tr>
                  </thead>
                  <tbody className={'max-h-[600px] overflow-y-scroll text-xs'}>
                    {state.map((brand) => (
                      <tr key={brand.brandId} className={'leading-normal'}>
                        <td className={'border p-2 text-center'}>{brand.id}</td>
                        <td className={'border p-2'}>{brand.brandName}</td>
                        <td className={'border p-2'}>{brand.brandSlug}</td>
                        <td className={'border p-2'}>{brand.createdAt}</td>
                        <td className={'border p-2'}>{brand.updatedAt}</td>
                        <td className={'border p-2 text-center'}>
                          {brand.version}
                        </td>

                        <td className={'border p-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => {
                              setBrandData(brand);
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
                            onClick={() => deleteHandler(brand.id)}
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
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(`${nestApiUrl}/brands`);
  const data = response.data;
  return { props: { data } };
}
