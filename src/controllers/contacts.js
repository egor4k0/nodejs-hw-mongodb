import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Contacts found successfully',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = await req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found');
  }
  if (contact.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact found successfully',
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = await req.params;
  const contact = await patchContact(contactId, req.body, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found');
  }
  if (contact.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = await req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found');
  }
  if (contact.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).send();
};
