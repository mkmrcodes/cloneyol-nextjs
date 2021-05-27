import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';
import { IoBusinessSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { VscGroupByRefType } from 'react-icons/vsc';
import { SiBrandfolder } from 'react-icons/si';
import { RiProductHuntLine } from 'react-icons/ri';
import { AiOutlineGift } from 'react-icons/ai';

const AdminSidePanel = () => {
  return (
    <div className={'flex-none w-40'}>
      <div className={'flex flex-col'}>
        <Link href='/admin'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <RiAdminFill className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Admin</span>
          </a>
        </Link>
        <Link href='/admin/merchants'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <IoBusinessSharp className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Merchants</span>
          </a>
        </Link>
        <Link href='/admin/users'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <HiUsers className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Users</span>
          </a>
        </Link>
        <Link href='/admin/category'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <VscGroupByRefType className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Categories</span>
          </a>
        </Link>
        <Link href='/admin/brands'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <SiBrandfolder className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Brands</span>
          </a>
        </Link>
        <Link href='/admin/products'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <RiProductHuntLine className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Products</span>
          </a>
        </Link>
        <Link href='/admin/promotions'>
          <a
            className={
              'py-2 flex justify-around items-center text-center text-sm text-primary border hover:border-primary font-bold bg-white'
            }
          >
            <span className={'flex-none pl-8'}>
              <AiOutlineGift className={'text-primary w-5 h-5'} />
            </span>
            <span className={'flex-1'}>Promotions</span>
          </a>
        </Link>

        {/* <Link href='/admin/add'>
          <a
            className={
              'py-2 text-center text-sm font-bold text-gray-400 hover:text-black'
            }
          >
            Add Product
          </a>
        </Link>
        <Link href='/admin/brands/addBrand'>
          <a
            className={
              'py-2 text-center text-sm font-bold text-gray-400 hover:text-black'
            }
          >
            Create Brand
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default AdminSidePanel;
