import { ratingStars } from '../../utils/ratingStars';

const DetailRating = ({ value, review }) => {
  const ratingArray = ratingStars(value);
  return (
    <div className={'mt-1'}>
      {ratingArray[0] === 0 ? (
        <div className={'relative flex items-center h-3.5'}>
          <div className={'block mr-0.5'}>
            <div className={'block'}>
              <div
                className={
                  'block w-4 h-4 bg-empty-border-star transform scale-90'
                }
              ></div>
            </div>
          </div>
          <span className={'text-[#747474] text-xs'}>
            Henüz Yorum Yazılmamış.
          </span>
        </div>
      ) : (
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
              <div
                className={'w-3.5 h-3.5 bg-full-star transform scale-90'}
              ></div>
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
              <div
                className={'w-3.5 h-3.5 bg-full-star transform scale-90'}
              ></div>
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
              <div
                className={'w-3.5 h-3.5 bg-full-star transform scale-90'}
              ></div>
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
              <div
                className={'w-3.5 h-3.5 bg-full-star transform scale-90'}
              ></div>
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
              <div
                className={'w-3.5 h-3.5 bg-full-star transform scale-90'}
              ></div>
            </div>
          </div>
          <span
            className={'text-[#747474] text-xs'}
          >{`${review} Değerlendirme`}</span>
        </div>
      )}
    </div>
  );
};

export default DetailRating;
