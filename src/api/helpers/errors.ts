import { isInstance, ValidationError } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { QueryFailedError } from "typeorm";

const generateErrorFromDto = (err: ValidationError) => {
  return Object.values(err.constraints || [])[0] || err?.property + " invalid";
};

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

export const serverErrorResponse = (err: any) => {
  console.error(err);
  return errorResponse(
    "the server encountered a problem and could not process your request",
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};

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

export const failedValidationResponse = (err: ValidationError) =>
  errorResponse(generateErrorFromDto(err), StatusCodes.UNPROCESSABLE_ENTITY);

export const databaseResponse = (err: any) => {
  if (err instanceof QueryFailedError) {
    return errorResponse(err.driverError.detail, StatusCodes.CONFLICT);
  } else {
    return serverErrorResponse(err);
  }
};

export const inactiveAccountResponse = () =>
  errorResponse(
    "your user account must be activated to access this resource",
    StatusCodes.FORBIDDEN
  );
