import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FilterContext } from '../../store/FilterContext';
import { getParamsAsObject } from '../../utils/getParamsAsObject';

const AllCategoryFilter = ({ filter, root }) => {
  //const { updateFilter, filters } = useContext(FilterContext);
  const router = useRouter();
  const query = router.query;
  let params = query;
  const route = router.route;
  console.log('route:', route);

  console.log('params:', query);
  const lc = query.lc;
  let initialValues = [];
  if (lc) {
    initialValues = lc.split(',').map((x) => +x);
  }
  const [selected, setSelected] = useState(initialValues);

  // useEffect(() => {
  //   updateFilter(selected);
  // }, [selected]);

  const handleClick = (id) => {
    console.log('selected1:', selected);
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      const newSelected = selected.filter((x) => x !== id);
      setSelected(newSelected);
    }
    console.log('selected2:', selected);
  };
  function newRoute(catId) {
    //let route = `/sr?wc=${wc}&lc=${lc}`
    if (selected.includes(catId)) {
      params.lc = [...[selected.filter((item) => item !== catId)]];
    } else {
      params.lc = [...params.lc, catId];
    }
    return params;
  }
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Tüm Kategoriler</div>
      {filter.data.categoryLeafs.slice(1).map((cat) => {
        return (
          <Link key={cat.id} href={newRoute(cat.id)}>
            <a>
              <div
                className={'flex cursor-pointer'}
                onClick={() => handleClick(cat.id)}
              >
                {selected.includes(cat.id) ? (
                  <MdCheckBox className={'w-5 h-5 text-primary mr-1'} />
                ) : (
                  <MdCheckBoxOutlineBlank
                    className={'w-5 h-5 text-muted mr-1'}
                  />
                )}
                <span>{cat.catLabel}</span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default AllCategoryFilter;
