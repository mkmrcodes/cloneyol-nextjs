import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'w-full mx-auto px-8'}>
        <div className={'relative'}>
          <input
            type='text'
            {...register('search')}
            className={
              'w-full bg-[#F3F3F3] border-none text-sm py-2.5 rounded-md focus:ring-2 focus:ring-primary'
            }
            placeholder='Aradığınız ürün, kategori veya markayı yazınız'
          />
          <div className={'absolute top-3 right-5 cursor-pointer'}>
            <BiSearch className={'w-5 h-5 text-primary'} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
