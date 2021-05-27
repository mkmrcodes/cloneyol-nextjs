import Link from 'next/link';

const RelatedCategorySearch = (props) => {
  const { wb } = props;
  const leafs = props.filter.data.categoryLeafs;
  const ancestors = props.filter.data.ancestors;
  const reversed = [...ancestors].reverse();

  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>İlgili Kategoriler</div>
      {leafs.length !== 1
        ? leafs.slice(1).map((cat) => {
            return (
              <Link
                key={cat.id}
                href={wb ? `/sr?wb=${wb}&wc=${cat.id}` : `/sr?wc=${cat.id}`}
              >
                <a>
                  <div className={'p-0.5 cursor-pointer hover:text-gray-400'}>
                    {cat.catLabel}
                  </div>
                </a>
              </Link>
            );
          })
        : reversed.map((cat, index) => {
            return (
              <Link
                key={index}
                href={wb ? `/sr?wb=${wb}&wc=${cat.id}` : `/sr?wc=${cat.id}`}
              >
                <a>
                  <div
                    className={
                      'p-0.5 cursor-pointer hover:text-gray-400 ' +
                      (index === 0 ? 'text-primary font-bold' : '')
                    }
                  >
                    {cat.catLabel}
                  </div>
                </a>
              </Link>
            );
          })}
    </div>
  );
};
export default RelatedCategorySearch;
