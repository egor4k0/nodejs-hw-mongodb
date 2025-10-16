const parseContactType = (contactType) => {
  if (typeof contactType === 'undefined') return undefined;
  const isContactType = (contactType) =>
    ['home', 'personal', 'work'].includes(contactType);
  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (value) => {
  if (typeof value === 'undefined') return undefined;
  const isFavourite = (value) => ['true', 'false'].includes(value);
  if (isFavourite(value)) return value;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
