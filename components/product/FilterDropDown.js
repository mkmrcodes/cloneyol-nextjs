import { useContext, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { mutate } from 'swr';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { ListingContext } from '../../store/listing/ListingContext';

const productFilter = [
  { id: 1, choice: 'Önerilen Sıralama', value: '&sst=SCORE' },
  { id: 2, choice: 'En düşük fiyat', value: '&sst=PRICE_BY_ASC' },
  { id: 3, choice: 'En yüksek fiyat', value: '&sst=PRICE_BY_DESC' },
  { id: 4, choice: 'En yeniler', value: '&sst=MOST_RECENT' },
  { id: 5, choice: 'En çok değerlendirilenler', value: '&sst=MOST_RATED' },
];

export default function FilterDropDown() {
  const [selectedFilter, setSelectedFilter] = useState(productFilter[0]);
  const { changeListing } = useContext(ListingContext);

  function handleChange(value) {
    setSelectedFilter(value);
    changeListing(value.value);
  }

  return (
    <div className='border text-sm'>
      <Listbox
        value={selectedFilter}
        onChange={(value) => {
          handleChange(value);
        }}
      >
        <div className='w-[185px] mt-1 z-6'>
          <Listbox.Button
            className={
              'w-[185px] flex justify-between py-1 pl-3 text-sm text-left bg-white rounded-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-gray-500 focus-visible:ring-offset-2 focus-visible:border-gray-500'
            }
          >
            <span className='block truncate text-gray-500'>
              {selectedFilter.choice}
            </span>
            <RiArrowDropDownLine className={'w-5 h-5 text-gray-500'} />
          </Listbox.Button>
          <Listbox.Options
            className={
              'border border-gray-400 absolute text-base bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20'
            }
          >
            {productFilter.map((filter) => (
              <Listbox.Option
                key={filter.id}
                className={
                  'w-[185px] cursor-default select-none relative text-sm text-left text-gray-500'
                }
                value={filter}
              >
                {({ active }) => (
                  <span
                    className={`${
                      active
                        ? 'bg-blue-500 text-white '
                        : 'bg-white text-gray-500 '
                    } block truncate py-1 pl-3 pr-3 `}
                  >
                    {filter.choice}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
