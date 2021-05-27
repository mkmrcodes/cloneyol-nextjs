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
import AddMerchant from '../../../components/admin/AddMerchant';
import EditMerchant from '../../../components/admin/EditMerchant';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GETMERCHANTS':
      return action.payload;
    default:
      return state;
  }
};

export default function MerchantsPage({ data }) {
  const [state, dispatch] = useReducer(reducer, data);
  const [merchantData, setMerchantData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  async function deleteHandler(id) {
    await axios.delete(`${nestApiUrl}/merchants/${id}`).catch((e) => {
      toast.error('ERROR!');
    });
    await getMerchants();
  }

  async function getMerchants() {
    const response = await axios.get(`${nestApiUrl}/merchants`).catch((e) => {
      toast.error('ERROR!');
    });
    toast.success('DONE!');
    const newData = response.data;
    dispatch({ type: 'GETMERCHANTS', payload: newData });
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
                  <AddMerchant
                    setShowAdd={setShowAdd}
                    getMerchants={getMerchants}
                  />
                )}
              </div>
              <div>
                {showEdit && (
                  <EditMerchant
                    data={merchantData}
                    setShowEdit={setShowEdit}
                    getMerchants={getMerchants}
                  />
                )}
              </div>
              <div className='mx-auto mt-4 shadow-lg overflow-hidden rounded-sm'>
                <table className={'mx-auto table-auto'}>
                  <thead>
                    <tr className={'text-sm text-white bg-primary text-center'}>
                      <th scope='col' className={'border p-2'}>
                        Id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Name
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
                    {state.map((merchant) => (
                      <tr key={merchant.id} className={'leading-normal'}>
                        <td className={'border p-2 text-center'}>
                          {merchant.id}
                        </td>
                        <td className={'border p-2'}>{merchant.name}</td>
                        <td className={'border p-2'}>{merchant.createdAt}</td>
                        <td className={'border p-2'}>{merchant.updatedAt}</td>
                        <td className={'border p-2 text-center'}>
                          {merchant.version}
                        </td>

                        <td className={'border p-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => {
                              setMerchantData(merchant);
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
                            onClick={() => deleteHandler(merchant.id)}
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
  const response = await axios.get(`${nestApiUrl}/merchants`);
  const data = response.data;
  return { props: { data } };
}
