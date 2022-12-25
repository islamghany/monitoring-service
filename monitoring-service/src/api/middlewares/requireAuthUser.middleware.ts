import { IRequest } from "../../types/index";
import { NextFunction, Response } from "express";
import {
  authenticationRequiredResponse,
  serverErrorResponse,
} from "../helpers/errors";
import { usersRepository } from "../../db";

export const requiredAuthentication = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.id;

  if (!id) {
    return next(authenticationRequiredResponse());
  }
  try {
    const user = await usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return next(authenticationRequiredResponse());
    }
    req.user = user;
    return next();
  } catch (err: any) {
    return next(serverErrorResponse(err));
  }
};
