import { useSession, getSession } from 'next-auth/client';
import AdminSidePanel from '../../components/admin/AdminSidePanel';

export default function AdminPage() {
  const [session, loading] = useSession();
  if (typeof window !== 'undefined' && loading && session === null) return null;

  if (session !== null && session.user.isAdmin) {
    return (
      <>
        <div className={'w-full h-screen'}>
          <div className={'w-full mx-auto'}>
            <div className={'flex'}>
              <AdminSidePanel />
              <div className={'flex-1'}>
                <div>Adminnn</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <p>Access Denied</p>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
