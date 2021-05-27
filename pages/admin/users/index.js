import axios from 'axios';
import { useReducer } from 'react';
import Link from 'next/link';
import { nestApiUrl } from '../../../utils/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETEUSER':
      return action.payload;
    default:
      return state;
  }
};

export default function UsersPage({ data }) {
  const [state, dispatch] = useReducer(reducer, data);

  async function deleteHandler(id) {
    await axios.delete(`${nestApiUrl}/users/${id}`);
    const response = await axios.get(`${nestApiUrl}/users`);
    const newData = response.data;
    dispatch({ type: 'DELETEUSER', payload: newData });
  }
  // if (error) {
  //   return <p>Failed to load</p>;
  // }
  if (!data) {
    return <p>Loading..</p>;
  }

  return (
    <div className={'w-full h-screen'}>
      <div className={'w-full max-w-screen-xl mx-auto'}>
        <div className={'grid grid-cols-6'}>
          <div className={'col-start-1 col-span-1'}>
            <div className={'flex flex-col '}>
              <div className={'p-4 text-center text-2xl font-bold bg-white'}>
                MKMR-STORE
              </div>
              <Link href='/admin'>
                <a
                  className={
                    'py-2 text-center text-lg font-bold text-gray-400 hover:text-black'
                  }
                >
                  Admin
                </a>
              </Link>
              <Link href='/admin/add'>
                <a
                  className={
                    'py-2 text-center text-lg font-bold text-gray-400 hover:text-black'
                  }
                >
                  Add Product
                </a>
              </Link>
              <Link href='/admin/users'>
                <a
                  className={
                    'py-2 text-center text-lg text-[#5B73E8] font-bold bg-[#F3F8FB]'
                  }
                >
                  Users
                </a>
              </Link>
            </div>
          </div>
          <div className={'col-start-2 col-span-5 '}>
            <div
              className={
                'py-4 text-lg font-bold bg-white text-black text-center'
              }
            >
              ADMIN PANEL
            </div>
            <div
              className={
                'w-full h-screen flex flex-col justify-start space-y-4 shadow-inner bg-[#F3F8FB]'
              }
            >
              <div className='mx-auto mt-4 shadow-lg overflow-hidden rounded-xl'>
                <table className={'mx-auto table-auto'}>
                  <thead>
                    <tr className={'text-[#5B73E8] bg-[#BAE6FD] text-center'}>
                      <th scope='col' className={'border p-2'}>
                        Id
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Email
                      </th>
                      <th scope='col' className={'border p-2'}>
                        isAdmin
                      </th>
                      <th scope='col' className={'border p-2'}>
                        isMerchant
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Registered
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Updated
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Last Login
                      </th>
                      <th scope='col' className={'border p-2'}>
                        Version
                      </th>
                      <th scope='col' className={'border p-2'}>
                        EDIT
                      </th>
                      <th scope='col' className={'bg-[#BAE6FD] border p-2'}>
                        DELETE
                      </th>
                    </tr>
                  </thead>
                  <tbody className={'h-[600px] overflow-y-scroll'}>
                    {state.map((user) => (
                      <tr key={user.userId}>
                        <td className={'border p-2'}>{user.userId}</td>
                        <td className={'border p-2'}>{user.email}</td>
                        <td className={'border p-2'}>
                          {user.isAdmin === true ? 'Yes' : 'No'}
                        </td>
                        <td className={'border p-2'}>
                          {user.isMerchant === true ? 'Yes' : 'No'}
                        </td>
                        <td className={'border p-2'}>
                          {user.registrationDate}
                        </td>
                        <td className={'border p-2'}>{user.updatedAt}</td>
                        <td className={'border p-2'}>{user.lastLoginDate}</td>
                        <td className={'border p-2'}>{user.verison}</td>

                        <td className={'border p-2'}>
                          <Link
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            href={`/admin/users/${user.userId}`}
                          >
                            <div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 text-green-800'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                />
                              </svg>
                            </div>
                          </Link>
                        </td>
                        <td className={'border px-4 py-2'}>
                          <button
                            className={
                              'flex mx-auto justify-center items-center'
                            }
                            onClick={() => deleteHandler(user.userId)}
                          >
                            <div className={'space-x-2 '}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 text-red-600'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                  clipRule='evenodd'
                                />
                              </svg>
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
  const response = await axios.get(`${nestApiUrl}/users`);
  const data = response.data;
  return { props: { data } };
}
