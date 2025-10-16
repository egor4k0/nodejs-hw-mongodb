import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = 'asc',
  sortOrder = '_id',
  filter = {},
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactQuery = ContactsCollection.find();

  if (typeof filter.contactType !== 'undefined') {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [total, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const paginationData = calculatePaginationData(total, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const patchContact = async (contactId, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
    },
  );
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};
