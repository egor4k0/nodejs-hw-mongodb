const parseContactType = (t) => {
  const isString = typeof t === 'string';
  if (!isString) return;
  const isAllowedType = (t) => ['work', 'home', 'personal'].includes(t);

  if (isAllowedType(t)) return t;
};

const parseFavourite = (v) => {
  const isString = typeof v === 'string';
  if (!isString) return;

  if (v == 'true') return true;
  if (v == 'false') return false;
  else return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};
