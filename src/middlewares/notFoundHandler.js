import createError from "http-errors";

export const notFoundHandler = (res, req, next) => {
  throw new createError.NotFound("Route not found");
};
