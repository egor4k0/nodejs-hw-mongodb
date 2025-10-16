const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    '_id',
    'name',
    'phoneNumber',
    'createdAt',
    'updatedAt',
    'email',
    'isFavourite',
    'contactType',
  ];

  if (keysOfContacts.includes(sortBy)) return sortBy;

  return '_id';
};

const parseSortOrder = (sortOrder) => {
  if (typeof sortOrder === 'undefined') return 'asc';
  if (sortOrder !== 'asc' && sortOrder !== 'desc') return 'asc';
  return sortOrder;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
