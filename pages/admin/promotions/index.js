import axios from 'axios';
import { useReducer, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../../../utils/constants';
import AdminSidePanel from '../../../components/admin/AdminSidePanel';
import { CgCloseR } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import EditPromotion from '../../../components/admin/EditPromotion';
import AddPromotion from '../../../components/admin/AddPromotion';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GETPROMOTIONS':
      return action.payload;
    default:
      return state;
  }
};

export default function PromotionsPage({ data }) {
  const [state, dispatch] = useReducer(reducer, data);
  const [promotionData, setPromotionData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  async function deleteHandler(id) {
    await axios.delete(`${nestApiUrl}/promotions/${id}`).catch((e) => {
      toast.error('ERROR!');
    });
    await getPromotions();
  }

  async function getPromotions() {
    const response = await axios.get(`${nestApiUrl}/promotions`).catch((e) => {
      toast.error('ERROR!');
    });
    toast.success('DONE!');
    const newData = response.data;
    dispatch({ type: 'GETPROMOTIONS', payload: newData });
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
                  <AddPromotion
                    setShowAdd={setShowAdd}
                    getPromotions={getPromotions}
                  />
                )}
              </div>
              <div>
                {showEdit && (
                  <EditPromotion
                    data={promotionData}
                    setShowEdit={setShowEdit}
                    getBrands={getPromotions}
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
                        Promotion Label
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Promotion Discount
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
                    {state.map((promotion) => (
                      <tr key={promotion.id} className={'leading-normal'}>
                        <td className={'border p-2 text-center'}>
                          {promotion.id}
                        </td>
                        <td className={'border p-2'}>
                          {promotion.promotionLabel}
                        </td>
                        <td className={'border p-2'}>
                          {promotion.promotionDiscount}
                        </td>
                        <td className={'border p-2'}>{promotion.createdAt}</td>
                        <td className={'border p-2'}>{promotion.updatedAt}</td>
                        <td className={'border p-2 text-center'}>
                          {promotion.version}
                        </td>

                        <td className={'border p-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => {
                              setPromotionData(promotion);
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
                            onClick={() => deleteHandler(promotion.id)}
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
  const response = await axios.get(`${nestApiUrl}/promotions`);
  const data = response.data;
  return { props: { data } };
}
