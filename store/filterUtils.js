export const deleteFromFilters = (fToRemove, filters) => {
  if (!Array.isArray(filters) || filters === []) return;
  console.log('filters:', filters);
  return filters.filter((f) => f !== fToRemove);
};
