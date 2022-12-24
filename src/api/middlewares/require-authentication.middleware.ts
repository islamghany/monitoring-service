import { IRequest } from "../../types/index";
import { NextFunction, Response } from "express";
import {
  authenticationRequiredResponse,
  invalidAuthenticationTokenResponse,
  serverErrorResponse,
} from "../helpers/errors";
import { usersRepository } from "src/db";

export const requiredAuthentication = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth?.id) {
    return next(authenticationRequiredResponse());
  }

  const id = req.auth.id;

  try {
    const user = await usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return next(authenticationRequiredResponse());
    }
    return next();
  } catch (err: any) {
    return next(serverErrorResponse(err));
  }
};
