import Image from 'next/image';
import Link from 'next/link';
export default function Product({ data }) {
  return (
    <Link href={`/products/${data.id}`}>
      <li className={'mx-auto my-4 cursor-pointer'}>
        <div
          className={
            'mx-1 p-2 border rounded-md hover:shadow-xl bg-[#ececec] text-center '
          }
        >
          <Image
            className={'transform duration-500 ease-in-out hover:scale-125'}
            src={data.image}
            alt={data.name}
            width={180}
            height={180}
          />

          <h4 className={'font-bold'}>{data.productName}</h4>
          <h4>{`${data.price} TL`}</h4>
        </div>
      </li>
    </Link>
  );
}
