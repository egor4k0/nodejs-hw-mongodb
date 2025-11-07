import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err))
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      errors: err.errors || undefined,
    });

  return res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
