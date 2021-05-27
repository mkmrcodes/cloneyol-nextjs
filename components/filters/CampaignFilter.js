const campaigns = [
  { link: '/', title: '4 Yıldızlı Fırsat Ürünleri' },
  { link: '/', title: '3 Yıldızlı Fırsat Ürünleri' },
  { link: '/', title: '2 Yıldızlı Fırsat Ürünleri' },
];

const CampaignFilter = () => {
  return (
    <div className={'py-2 text-sm border-b'}>
      <div className={'font-bold'}>Fırsat Ürünleri</div>
      {campaigns.map((campaign, index) => {
        return (
          <a key={index} href={'#'}>
            <label
              className={
                'flex items-center ml-0.5 text-black text-sm cursor-pointer '
              }
              htmlFor={campaign.title}
            >
              <input
                id={campaign.title}
                type='checkbox'
                className={
                  'border-gray-300 rounded-sm checked:bg-primary checked:border-primary checked:focus:bg-primary checked:hover:bg-primary hover:border-gray-400 focus:ring-0 focus:ring-offset-0'
                }
                value='false'
              />
              <div
                className={
                  'p-0.5 ml-1 cursor-pointer hover:text-gray-400 label-cb-checked:font-bold'
                }
              >
                {campaign.title}
              </div>
            </label>
          </a>
        );
      })}
    </div>
  );
};
export default CampaignFilter;
