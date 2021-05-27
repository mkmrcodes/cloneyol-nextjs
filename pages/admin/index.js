import AdminSidePanel from '../../components/admin/AdminSidePanel';

export default function AdminPage() {
  return (
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
  );
}
