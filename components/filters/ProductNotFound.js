import { HiOutlineEmojiSad } from 'react-icons/hi';
const ProductNotFound = () => {
  return (
    <div
      className={
        'w-3/4 flex flex-col justify-items-center items-center mx-auto border p-12'
      }
    >
      <HiOutlineEmojiSad className={'w-20 h-20 text-muted'} />
      <span className={'pt-4'}>Aramanız için sonuç bulunamadı.</span>
      <ul className={'text-sm list-disc pt-8'}>
        <li className={'text-primary pt-4'}>
          <div className={'text-black'}>
            Yukarıda yer alan aramanıza benzer tahminlere göz atın
          </div>
        </li>
        <li className={'text-primary pt-4'}>
          <div className={'text-black'}>
            Yazım kurallarına uyarak daha genel aramalar yapmayı tercih edin
          </div>
        </li>
        <li className={'text-primary pt-4'}>
          <div className={'text-black'}>
            Soldaki kategori ağacı ile ilginizi çeken kategorileri seçin
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProductNotFound;
