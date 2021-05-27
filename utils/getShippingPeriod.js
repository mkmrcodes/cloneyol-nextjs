export function getShippingPeriod(shippingStart, maxShippingPeriod) {
  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];
  const months31 = [1, 3, 5, 7, 8, 10, 12];
  const leapYears = [2024, 2028, 2032, 2036];
  let isMonthChanged = false;

  const formatterDay = new Intl.DateTimeFormat('tr', {
    day: '2-digit',
  });
  const formatterMonth = new Intl.DateTimeFormat('tr', {
    month: 'numeric',
  });
  const formatterYear = new Intl.DateTimeFormat('tr', {
    year: 'numeric',
  });

  //get day and month as numbers
  const day = parseInt(formatterDay.format(new Date()));
  const month = formatterMonth.format(new Date());
  const year = parseInt(formatterYear.format(new Date()));
  let startMonth = parseInt(month);
  let startMonthString = monthNames[startMonth - 1];
  let endMonth = parseInt(month);
  let endMonthString = monthNames[endMonth - 1];

  //calculate shipping day and month
  let startDay = parseInt(day) + shippingStart;
  let endDay = startDay + maxShippingPeriod;

  //check shipping day overflow month
  if (endMonth in months31) {
    if (endDay >= 31) {
      endDay = endDay - 31;
      endMonth = endMonth + 1;
      isMonthChanged = true;
      endMonthString = monthNames[endMonth - 1];
    } else {
      if (endDay >= 30) {
        endDay = endDay - 30;
        endMonth = endMonth + 1;
        isMonthChanged = true;
        endMonthString = monthNames[endMonth - 1];
      }
    }
  }
  if (endMonth === 2) {
    if (endDay >= 28) {
      endDay = endDay - 28;
      endMonth = endMonth + 1;
      isMonthChanged = true;
      endMonthString = monthNames[endMonth - 1];
    } else if (year in leapYears) {
      if (endDay >= 29) {
        endDay = endDay - 29;
        endMonth = endMonth + 1;
        isMonthChanged = true;
        endMonthString = monthNames[endMonth - 1];
      }
    }
  }

  const period = `${startDay} - ${startMonthString}  ${endDay}-${endMonthString}`;
  const period1 = `${startDay} - ${endDay} ${endMonthString}`;
  if (isMonthChanged) {
    return period;
  } else return period1;
}
