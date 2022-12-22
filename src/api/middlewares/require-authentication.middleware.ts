import { IRequest } from "../../types/index";
import { NextFunction, Response } from "express";
import {
  authenticationRequiredResponse,
  invalidAuthenticationTokenResponse,
  serverErrorResponse,
} from "../helpers/errors";
//import { bikerRepository, senderRepository } from "../db";

export const requiredAuthentication = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  // if (role === "BIKER" && req.auth?.id) {
  //   try {
  //     const biker = await bikerRepository.findOne({
  //       where: {
  //         id: req.auth.id,
  //       },
  //     });
  //     if (!biker) {
  //       return next(authenticationRequiredResponse());
  //     }
  //     return next();
  //   } catch (err: any) {
  //     return next(serverErrorResponse(err));
  //   }
  // }
  // if (role === "SENDER" && req.auth?.id) {
  //   try {
  //     const biker = await senderRepository.findOne({
  //       where: {
  //         id: req.auth.id,
  //       },
  //     });
  //     if (!biker) {
  //       return next(authenticationRequiredResponse());
  //     }
  //     return next();
  //   } catch (err: any) {
  //     return next(serverErrorResponse(err));
  //   }
  // }
  // return next(authenticationRequiredResponse());
};
