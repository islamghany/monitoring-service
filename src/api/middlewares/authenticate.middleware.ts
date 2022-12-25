import { IRequest } from "../../types/index";
import { TokenPayload, verifyToken } from "./../helpers/token";
import { NextFunction, Response } from "express";
import { serverErrorResponse } from "../helpers/errors";

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
  req.id = decodedToken.id;

  return next();
};
