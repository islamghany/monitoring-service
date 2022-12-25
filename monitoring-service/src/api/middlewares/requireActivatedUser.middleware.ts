import { IRequest } from "../../types/index";
import { NextFunction, Response } from "express";
import { inactiveAccountResponse } from "../helpers/errors";
import { usersRepository } from "src/db";

export const requireActivatedUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.activated) {
    return next();
  }

  return next(inactiveAccountResponse());
};
