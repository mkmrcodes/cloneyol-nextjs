export function ratingStars(value) {
  let ratingArray = [];
  const ratingInt = Math.trunc(value);
  const ratingDecimal = (value - ratingInt).toFixed(2) * 100;
  for (let i = 1; i <= ratingInt; i++) {
    ratingArray.push(100);
  }
  ratingArray.push(ratingDecimal);
  const blanks = 5 - ratingArray.length;
  for (let x = 1; x <= blanks; x++) {
    ratingArray.push(0);
  }

  return ratingArray;
}
