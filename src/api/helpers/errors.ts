import { StatusCodes } from "http-status-codes";
export class HttpError extends Error {
  code: number;
  message: string;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorResponse = (message: string, code: number) =>
  new HttpError(message, code);

export const serverErrorResponse = (err: Error) =>
  errorResponse(
    "the server encountered a problem and could not process your request",
    StatusCodes.INTERNAL_SERVER_ERROR
  );

export const notFoundResponse = () =>
  errorResponse(
    "the requested resource could not be found",
    StatusCodes.NOT_FOUND
  );

export const authenticationRequiredResponse = () =>
  errorResponse(
    "you must be authenticated to access this resource",
    StatusCodes.UNAUTHORIZED
  );

export const invalidCredentialsResponse = () =>
  errorResponse("invalid authentication credentials", StatusCodes.UNAUTHORIZED);

export const badRequestResponse = () =>
  errorResponse("Bad Request", StatusCodes.BAD_REQUEST);

export const invalidAuthenticationTokenResponse = () =>
  errorResponse(
    "invalid or missing authentication token",
    StatusCodes.UNAUTHORIZED
  );
