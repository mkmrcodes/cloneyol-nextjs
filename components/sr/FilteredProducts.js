import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import useSWR from 'swr';
import PCard from '../product/PCard';
import ProductNotFound from '../../components/filters/ProductNotFound';
import { ListingContext } from '../../store/listing/ListingContext';
import { nestApiUrl } from '../../utils/constants';

export function FilteredProducts({ products, reqUrl }) {
  const { listType } = useContext(ListingContext);
  const fetchUrl = `${nestApiUrl}${reqUrl.replace('sr?', 'items?')}${listType}`;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(fetchUrl, fetcher, {
    revalidateOnMount: false,
  });
  //if (!data) return 'Loading...';
  products = data || products;

  // useEffect(() => {
  //   console.log('effect worked');
  //   console.log(listType);
  // }, [listType]);

  // const { data, error } = useSWR(fetchUrl, fetcher, {
  //   dedupingInterval: 60000,
  // });
  // products = data || products;

  return (
    <div className={'flex flex-wrap mt-2 space-x-4'}>
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
