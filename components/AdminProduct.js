import Image from 'next/image';
export default function AdminProduct({ data }) {
  return (
    <li className={'mx-auto my-4'}>
      <div
        className={
          'mx-1 p-2 border rounded-md hover:shadow-xl bg-[#ececec] text-center '
        }
      >
        <h4 className={'font-bold'}>{data.productName}</h4>
        <h4>{`${data.productPrice} TL`}</h4>
      </div>
    </li>
  );
}
