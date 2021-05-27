import { getShippingPeriod } from '../../utils/getShippingPeriod';

const ShippingPeriod = ({ shippingStart, maxShippingPeriod }) => {
  const period = getShippingPeriod(shippingStart, maxShippingPeriod);

  return <div className={'text-xs text-muted'}>{period}</div>;
};

export default ShippingPeriod;
