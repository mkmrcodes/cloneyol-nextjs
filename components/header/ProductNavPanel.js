import Image from 'next/image';
import Link from 'next/link';

const Category = ({ setOnHover }) => {
  let cat = [];
  function handleClick() {
    setOnHover(false);
  }

  for (let i = 0; i <= 5; i++) {
    cat.push(
      <div key={i} className={'flex flex-col m-2 px-2'}>
        <Link href={'/ev-bakim-ve-temizlik-x-c2'}>
          <a
            className={'text-base font-bold hover:text-primary'}
            onClick={handleClick}
          >
            Ev & Temizlik
          </a>
        </Link>
        <Link href={'/camasir-yikama-urunleri-x-c3'}>
          <a
            className={'text-sm text-gray-500 hover:text-primary'}
            onClick={handleClick}
          >
            Çamaşır Yıkama
          </a>
        </Link>
        <Link href={'/camasir-yikama-urunleri-x-c3'}>
          <a
            className={'text-sm text-gray-500 hover:text-primary'}
            onClick={handleClick}
          >
            Çamaşır Yıkama
          </a>
        </Link>
        <Link href={'/camasir-yikama-urunleri-x-c3'}>
          <a
            className={'text-sm text-gray-500 hover:text-primary'}
            onClick={handleClick}
          >
            Çamaşır Yıkama
          </a>
        </Link>
        <Link href={'/camasir-yikama-urunleri-x-c3'}>
          <a
            className={'text-sm text-gray-500 hover:text-primary'}
            onClick={handleClick}
          >
            Çamaşır Yıkama
          </a>
        </Link>
        <Link href={'/camasir-yikama-urunleri-x-c3'}>
          <a
            className={'text-sm text-gray-500 hover:text-primary'}
            onClick={handleClick}
          >
            Çamaşır Yıkama
          </a>
        </Link>
      </div>
    );
  }
  return cat;
};
const ProductNavPanel = ({ setOnHover }) => {
  return (
    <div className={'p-4 border-t z-1 overflow-hidden'}>
      <div className={'grid grid-cols-12'}>
        <div className={'col-span-5'}>
          <div className={'flex flex-wrap justify-center items-center mt-3 '}>
            <Category setOnHover={setOnHover} />
          </div>
        </div>
        <div className={'col-span-7'}>
          <div className={'flex flex-wrap mr-2'}>
            <div className={'w-1/2 p-3'}>
              <Image src={'/images/panelPic.jpg'} width={500} height={246} />
            </div>
            <div className={'w-1/2 p-3'}>
              <Image src={'/images/panelPic.jpg'} width={500} height={246} />
            </div>
            <div className={'w-1/2 p-3'}>
              <Image src={'/images/panelPic.jpg'} width={500} height={246} />
            </div>
            <div className={'w-1/2 p-3'}>
              <Image src={'/images/panelPic.jpg'} width={500} height={246} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNavPanel;
