import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError.Unauthorized('Please provide authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError.Unauthorized('Auth header should be Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({
    accessToken: token,
  });

  if (!session) {
    next(createHttpError.Unauthorized('Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError.Unauthorized('Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    next(createHttpError.Unauthorized('User not found'));
    return;
  }

  req.user = user;

  next();
};
