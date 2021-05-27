import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const AllCategoryFilter = ({ filter, root }) => {
  const router = useRouter();
  const [picked, setPicked] = useState([]);

  const handleClick = (id) => {
    if (!picked.includes(id)) {
      setPicked([...picked, id]);
    } else {
      const newPicked = picked.filter((x) => x !== id);
      setPicked(newPicked);
    }
    // const values = { wc: root, lc: id };
    // router.push({
    //   pathname: '/sr',
    //   query: { ...values },
    // });
  };
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Tüm Kategoriler</div>
      {filter.data.categoryLeafs.slice(1).map((cat) => {
        return (
          <Link key={cat.id} href={`/sr?wc=${root}&lc=${cat.id}`}>
            <a>
              <div
                className={'flex cursor-pointer'}
                onClick={() => handleClick(cat.id)}
              >
                {picked.includes(cat.id) ? (
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
