import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import PCard from '../product/PCard';
import ProductNotFound from '../../components/filters/ProductNotFound';

export function FilteredProducts({ products }) {
  // const fetchUrl = `http://localhost:3001/api/items/cat-arr/${filter}`;
  // let newProducts = [];
  // if (filter) {
  //   const fetcher = axios.get(fetchUrl).then((res) => res.data);
  //   const { data, error } = useSWR(fetchUrl, fetcher, {
  //     dedupingInterval: 60000,
  //   });

  //   newProducts = data || products;
  // } else {
  //   newProducts = products;
  //}

  return (
    <div className={'flex flex-wrap justify-between mt-2'}>
      {!products.length ? (
        <ProductNotFound />
      ) : (
        products.map((product) => {
          return (
            <PCard
              key={product.code}
              product={product}
              promotion={'75 TL Üzeri 15 TL İndirim'}
            />
          );
        })
      )}
    </div>
  );
}
