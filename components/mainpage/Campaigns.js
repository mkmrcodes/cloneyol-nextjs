import Image from 'next/image';
import Link from 'next/link';

const campaigns = [];
for (let i = 1; i <= 8; i++) {
  campaigns.push(
    <div key={i} className={'group mb-4 cursor-pointer bg-white'}>
      <Link href={`/ev-bakim-ve-temizlik-x-c2`}>
        <a>
          <Image
            className={
              'transform duration-1000 ease-in-out group-hover:scale-105'
            }
            src={'/images/campaign.png'}
            width={958}
            height={251}
          />
          <p
            className={
              '-mt-1.5 p-1.5 text-sm bg-black text-white group-hover:bg-primary'
            }
          >
            Süpermarket Ürünleri
          </p>
        </a>
      </Link>
    </div>
  );
}

const Campaigns = () => {
  return <div className={'bg-white z-50'}>{campaigns}</div>;
};

export default Campaigns;
