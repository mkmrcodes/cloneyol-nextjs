import Link from 'next/link';

const RelatedCategoryFilter = (props) => {
  const leafs = props.filter.data.categoryLeafs;
  const ancestors = props.filter.data.ancestors;

  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>İlgili Kategoriler</div>
      {leafs.length !== 1
        ? leafs.slice(1).map((cat) => {
            return (
              <Link key={cat.id} href={`/${cat.catSlug}-x-c${cat.id}`}>
                <a>
                  <div className={'p-0.5 cursor-pointer hover:text-gray-400'}>
                    {cat.catLabel}
                  </div>
                </a>
              </Link>
            );
          })
        : ancestors.map((cat, index) => {
            return (
              <Link key={index} href={`${cat.catSlug}-x-c${cat.id}`}>
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
export default RelatedCategoryFilter;
