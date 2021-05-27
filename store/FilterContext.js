import { createContext } from 'react';
import { FILTER_INITIAL_STATE } from './filterReducer';

export const FilterContext = createContext({ ...FILTER_INITIAL_STATE });
