import { ratingStars } from '../../utils/ratingStars';

const NewRating = ({ value, review }) => {
  const ratingArray = ratingStars(value);
  return (
    <div className={'relative flex items-center h-3.5'}>
      <div className={'block relative mr-0.5'}>
        <div className={'block'}>
          <div
            className={'block w-3.5 h-3.5 bg-empty-star transform scale-90'}
          ></div>
        </div>
        <div
          className={
            'block absolute max-w-full left-0 top-0 overflow-hidden whitespace-nowrap'
          }
          style={{ width: `${ratingArray[0]}%` }}
        >
          <div className={'w-3.5 h-3.5 bg-full-star transform scale-90'}></div>
        </div>
      </div>
      <div className={'block relative mr-0.5'}>
        <div className={'block'}>
          <div
            className={'block w-3.5 h-3.5 bg-empty-star transform scale-90'}
          ></div>
        </div>
        <div
          className={
            'block absolute max-w-full left-0 top-0 overflow-hidden whitespace-nowrap'
          }
          style={{ width: `${ratingArray[1]}%` }}
        >
          <div className={'w-3.5 h-3.5 bg-full-star transform scale-90'}></div>
        </div>
      </div>
      <div className={'block relative mr-0.5'}>
        <div className={'block'}>
          <div
            className={'block w-3.5 h-3.5 bg-empty-star transform scale-90'}
          ></div>
        </div>
        <div
          className={
            'block absolute max-w-full left-0 top-0 overflow-hidden whitespace-nowrap'
          }
          style={{ width: `${ratingArray[2]}%` }}
        >
          <div className={'w-3.5 h-3.5 bg-full-star transform scale-90'}></div>
        </div>
      </div>
      <div className={'block relative mr-0.5'}>
        <div className={'block'}>
          <div
            className={'block w-3.5 h-3.5 bg-empty-star transform scale-90'}
          ></div>
        </div>
        <div
          className={
            'block absolute max-w-full left-0 top-0 overflow-hidden whitespace-nowrap'
          }
          style={{ width: `${ratingArray[3]}%` }}
        >
          <div className={'w-3.5 h-3.5 bg-full-star transform scale-90'}></div>
        </div>
      </div>
      <div className={'block relative mr-0.5'}>
        <div className={'block'}>
          <div
            className={'block w-3.5 h-3.5 bg-empty-star transform scale-90'}
          ></div>
        </div>
        <div
          className={
            'block absolute max-w-full left-0 top-0 overflow-hidden whitespace-nowrap'
          }
          style={{ width: `${ratingArray[4]}%` }}
        >
          <div className={'w-3.5 h-3.5 bg-full-star transform scale-90'}></div>
        </div>
      </div>
      <span className={'text-[#747474] text-xs'}>{`(${review})`}</span>
    </div>
  );
};

export default NewRating;
