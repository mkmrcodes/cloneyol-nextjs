import listingTypes from './listing.types';

export const LISTING_INITIAL_STATE = {
  listType: '&sst=SCORE',
};

export function listingReducer(state, action) {
  switch (action.type) {
    case listingTypes.CHANGE_LISTING:
      return {
        ...state,
        listType: action.payload,
      };
    default:
      return state;
  }
}
