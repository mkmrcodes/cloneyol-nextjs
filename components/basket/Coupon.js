import { useForm } from 'react-hook-form';
import { VscClose } from 'react-icons/vsc';

const Coupon = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={'border my-4 p-4'}>
      <div className={'text-sm font-bold'}>İndirim Kodu Gir</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'w-full flex justify-between mx-auto my-2'}>
          <div className={'relative'}>
            <input
              type='text'
              {...register('coupon')}
              className={
                'w-full bg-[#F2F2F0] border-none text-xs text-gray-500 py-2 rounded-md focus:ring-0'
              }
              placeholder='Kodunuzu giriniz'
            />
            <div className={'absolute top-2 right-2 cursor-pointer'}>
              <VscClose className={'w-4 h-4 text-gray-400'} />
            </div>
          </div>
          <button
            type='submit'
            className={'text-sm text-white bg-primary rounded-sm p-1.5 ml-2'}
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default Coupon;
