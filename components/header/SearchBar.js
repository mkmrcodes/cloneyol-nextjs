import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { nestApiUrl } from '../../utils/constants';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchText(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
          setOpen(true);
        });
        console.log(results);
      } else {
        setResults([]);
        setIsSearching(false);
        setOpen(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className={'w-full mx-auto px-8'}>
      <div className={'relative'}>
        <input
          type='text'
          className={
            'w-full bg-[#F3F3F3] border border-white text-sm py-2.5 rounded-md focus:border-2 focus:border-primary focus:ring-0 ' +
            (open ? 'focus:rounded-b-none' : '')
          }
          placeholder='Aradığınız ürün adını yazınız'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={'absolute top-3 right-5 cursor-pointer'}>
          <BiSearch className={'w-5 h-5 text-primary'} />
        </div>
        {open && (
          <div
            className={
              'absolute w-full p-2 text-sm border-2 border-t-0 border-primary z-50 bg-white rounded-md rounded-t-none '
            }
            onMouseLeave={() => setOpen(false)}
          >
            {results !== [] &&
              results.map((item) => {
                const name = item.name.replace(
                  new RegExp(searchTerm, 'gi'),
                  (match) => `<strong>${match}</strong>`
                );
                console.log(name);
                return (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}-p-${item.id}`}
                  >
                    <a onClick={() => setOpen(false)}>
                      <div
                        className={'mt-2'}
                        dangerouslySetInnerHTML={{ __html: name }}
                      ></div>
                    </a>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

async function searchText(search) {
  return await axios
    .get(`${nestApiUrl}/items?q=${search}`)
    .then((res) => res.data);
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
export default SearchBar;
