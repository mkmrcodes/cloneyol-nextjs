import axios from 'axios';
import { useReducer, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nestApiUrl } from '../../../utils/constants';
import AdminSidePanel from '../../../components/admin/AdminSidePanel';
import { CgCloseR } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import AddCat from '../../../components/admin/AddCat';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GETCATS':
      return action.payload;
    default:
      return state;
  }
};

export default function CategoryPage({ data }) {
  const [state, dispatch] = useReducer(reducer, data);
  const [catData, setCatData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  async function deleteHandler(id) {
    await axios.delete(`${nestApiUrl}/category/${id}`).catch((e) => {
      toast.error('ERROR!');
    });
    await getCats();
  }

  async function getCats() {
    const response = await axios.get(`${nestApiUrl}/category`).catch((e) => {
      toast.error('ERROR!');
    });
    toast.success('DONE!');
    const newData = response.data;
    dispatch({ type: 'GETCATS', payload: newData });
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
                  <AddCat setShowAdd={setShowAdd} getCats={getCats} />
                )}
              </div>
              <div>
                {showEdit && (
                  <EditCat
                    data={catData}
                    setShowEdit={setShowEdit}
                    getCats={getCats}
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
                        CatLabel
                      </th>
                      <th scope='col' className={'border p-2'}>
                        CatSlug
                      </th>
                      <th scope='col' className={'border p-2'}>
                        ParentCatId
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Attr1Id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Attr1Label
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Attr2Id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Attr2Label
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Attr3Id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Attr3Label
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
                    {state.map((cat) => (
                      <tr key={cat.id} className={'leading-normal'}>
                        <td className={'border p-2 text-center'}>{cat.id}</td>
                        <td className={'border p-2'}>{cat.catLabel}</td>
                        <td className={'border p-2'}>{cat.catSlug}</td>
                        <td className={'border p-2'}>{cat.parent}</td>
                        <td className={'border p-2'}>{cat.attr1Id}</td>
                        <td className={'border p-2'}>{cat.attr1Label}</td>
                        <td className={'border p-2'}>{cat.attr2Id}</td>
                        <td className={'border p-2'}>{cat.attr2Label}</td>
                        <td className={'border p-2'}>{cat.attr3Id}</td>
                        <td className={'border p-2'}>{cat.attr3Label}</td>
                        <td className={'border p-2'}>{cat.createdAt}</td>
                        <td className={'border p-2'}>{cat.updatedAt}</td>
                        <td className={'border p-2 text-center'}>
                          {cat.version}
                        </td>

                        <td className={'border p-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => {
                              setCatData(cat);
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
                            onClick={() => deleteHandler(cat.id)}
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
  const response = await axios.get(`${nestApiUrl}/category`);
  const data = response.data;
  console.log(data);
  return { props: { data } };
}
