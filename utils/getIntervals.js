import gauss from 'gauss';

function round(num, pre) {
  if (!pre) pre = 0;
  var pow = Math.pow(100, pre);
  return Math.round(num * pow) / pow;
}

export function getIntervals(arr) {
  var set = new gauss.Vector([...arr]);
  let s = arr.length;
  // TODO optimize this
  if (s >= 6) {
    s = 6;
  }

  let q = set.quantile(s);
  let max = set.max();
  q.push(max);

  var result = [];

  let pre = 0;
  for (let i = 0; i <= q.length - 1; i++) {
    let value = round(q[i], 0);
    result.push(`${pre}-${value}`);
    pre = value;
  }
  return result;
}
