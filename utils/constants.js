import { components } from 'react-select';
import { ChevronDownIcon } from '@heroicons/react/outline';

export const nestApiUrl = 'https://morning-mesa-36922.herokuapp.com/api';
export const nestApiBaseUrl = 'https://morning-mesa-36922.herokuapp.com';

export const styles4Select = {
  control: (base, state) => ({
    ...base,
    height: 38,
    fontSize: 14,
    borderRadius: 2,
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    boxShadow: state.isFocused ? 0 : 0,
    borderColor: state.isFocused ? '#E5E7EB' : '#E5E7EB',
    '&:hover': {
      borderColor: state.isFocused ? '#E5E7EB' : '#E5E7EB',
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'black',
    '&:hover': {
      color: 'black',
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  valueContainer: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    paddingLeft: 2,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'white' : 'white',
    color: state.isSelected ? 'black' : 'black',
    paddingTop: 0,
    paddingBottom: 0,
  }),
};

export const gsmOptions = [
  { value: '+90', label: '+90' },
  { value: '+43', label: '+43' },
  { value: '+994', label: '+994' },
  { value: '+32', label: '+32' },
  { value: '+359', label: '+359' },
  { value: '+1', label: '+1' },
  { value: '+385', label: '+385' },
  { value: '+420', label: '+420' },
];
export const birthdayOptions = {
  day: function () {
    let day = [];
    for (let i = 1; i <= 31; i++) {
      day.push({ value: `${i}`, label: `${i}` });
    }
    return day;
  },
  month: function () {
    let month = [];
    for (let i = 1; i <= 12; i++) {
      month.push({ value: `${i}`, label: `${i}` });
    }
    return month;
  },
  year: function () {
    let year = [];
    for (let i = 2011; i >= 1900; i--) {
      year.push({ value: `${i}`, label: `${i}` });
    }
    return year;
  },
};

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className='h-5 w-5 text-black' />
    </components.DropdownIndicator>
  );
};
