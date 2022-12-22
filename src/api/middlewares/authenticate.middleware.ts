import { IRequest } from "../../types/index";
import { TokenPayload, verifyToken } from "./../helpers/token";
import { NextFunction, Response } from "express";
import {
  authenticationRequiredResponse,
  invalidAuthenticationTokenResponse,
  serverErrorResponse,
} from "../helpers/errors";
//import { bikerRepository, senderRepository } from "../db";

export const authenticate = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1] || undefined;
  if (!token) {
    return next();
  }

  let decodedToken: TokenPayload | undefined;

  try {
    decodedToken = verifyToken(token);

    decodedToken;
  } catch (err: any) {
    return next(serverErrorResponse(err));
  }

  if (typeof decodedToken === "undefined") {
    return next();
  }
  req.auth = {
    email: decodedToken.email,
    id: decodedToken.id,
  };

  return next();
};
