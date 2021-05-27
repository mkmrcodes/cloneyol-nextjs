import { getSession, session } from 'next-auth/client';
import ChangePassword from '../../components/user/ChangePassword';
import UserDetailsForm from '../../components/user/UserDetailsForm';
const UserPage = (props) => {
  return (
    <div className={'w-full md:w-10/12 max-w-screen-xl mx-auto bg-[#FEFEFE'}>
      <div className={'grid grid-cols-12 mt-8'}>
        <div className={'col-span-2'}>
          <div>sol menü</div>
        </div>
        <div className={'col-span-10 mx-2'}>
          <div
            className={'flex justify-between items-center border rounded-lg'}
          >
            <h1 className={'font-bold p-5 '}>Kullanıcı Bilgilerim</h1>
            <h1 className={'p-4  underline text-gray-500 text-sm'}>
              Hesabımı Kapat
            </h1>
          </div>
          <div className={'grid grid-cols-12'}>
            <div className={'col-span-6'}>
              <UserDetailsForm />
            </div>
            <div className={'col-span-6'}>
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
export default UserPage;
