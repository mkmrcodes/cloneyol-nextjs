import axios from 'axios';
import { useReducer } from 'react';
import listingTypes from './listing.types';
import { ListingContext } from './ListingContext';
import { listingReducer, LISTING_INITIAL_STATE } from './listingReducer';

export function ListingProvider({ children }) {
  const [store, dispatch] = useReducer(listingReducer, LISTING_INITIAL_STATE);
  const { listType } = store;

  const changeListing = async (listing) => {
    dispatch({
      type: listingTypes.CHANGE_LISTING,
      payload: listing,
    });
  };

  return (
    <ListingContext.Provider
      value={{
        listType,
        changeListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}
