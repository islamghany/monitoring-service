import { StatusCodes } from "http-status-codes";
import { accoutnActivationTemp } from "./../../services/mailer/templates/account_activation";
import { sendViaMail } from "../../services";
import { generateToken, verifyToken } from "./../helpers/token";
import { usersRepository } from "../../db";
import { hashPassword, verifyPassword } from "./../helpers/hashing";
import {
  badRequestResponse,
  databaseResponse,
  failedValidationResponse,
  invalidAuthenticationTokenResponse,
  invalidCredentialsResponse,
  notFoundResponse,
  serverErrorResponse,
} from "./../helpers/errors";
import {
  IDParamDto,
  ToeknDto,
  UserLoginDto,
  UserRegisterDTO,
} from "./../../db/dto/users.dto";
import { plainToClass } from "class-transformer";
import { NextFunction, Response } from "express";
import { IRequest } from "../../types";
import { validateSync } from "class-validator";
import { InsertResult } from "typeorm";
import { User } from "src/db/entities/User";

export const RegisterUserHandler = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  // 1- validate the request body
  const input = plainToClass(UserRegisterDTO, req.body);

  const errors = validateSync(input);
  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  // insert  User and make it not activated until he activate his email.

  let insertUserPlayload: InsertResult;
  try {
    const hashed_password = await hashPassword(input.password);
    insertUserPlayload = await usersRepository.insert({
      hashed_password,
      username: input.username,
      email: input.email,
      name: input.name,
      activated: false,
    });
  } catch (err) {
    // if there duplication in email or username is handled downthere
    return next(databaseResponse(err));
  }

  // send an email to the user to active his account;
  // in normal situation i would send activation token with the client url, and client send
  // a request to the server to validate it, but for the sake of the project i will send the token
  const userID = insertUserPlayload.raw[0].id;

  const activationToken = generateToken(
    {
      email: input.email,
      id: userID,
    },
    "1d"
  );

  try {
    sendViaMail({
      email: input.email,
      subject: "Activate Your Accunt",
      body: accoutnActivationTemp(userID, activationToken, "30 min"),
    });
  } catch (err) {
    return next(serverErrorResponse(err));
  }

  const token = generateToken(
    {
      email: input.email,
      id: userID,
    },
    "30d"
  );

  return res.status(StatusCodes.CREATED).json({
    token,
    user: {
      ...input,
      ...insertUserPlayload.raw[0],
    },
  });
};

export const activateUserHandler = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  // 1- validate the incoming token and check if it is not expired

  const input = plainToClass(ToeknDto, req.body);

  const errors = validateSync(input);
  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  const payload = verifyToken(input.token);

  if (!payload || !payload.id) {
    return next(invalidAuthenticationTokenResponse());
  }

  // 2- make the user activated

  try {
    const updatedRows = await usersRepository.update(payload.id, {
      activated: true,
    });
    if (!updatedRows.affected) {
      return next(badRequestResponse());
    }
  } catch (err) {
    return next(serverErrorResponse(err));
  }

  return res.status(StatusCodes.OK).json({
    message: "successfully activated your account",
  });
};

export const loginHandler = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const input = plainToClass(UserLoginDto, req.body);

  const errors = validateSync(input);
  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  let user: User | null;

  try {
    user = await usersRepository.findOne({
      where: {
        email: input.email,
      },
    });
  } catch (err) {
    return next(serverErrorResponse(err));
  }

  if (!user) {
    return next(invalidCredentialsResponse());
  }
  let isPasswordSame = false;
  try {
    isPasswordSame = await verifyPassword(user.hashed_password, input.password);
  } catch (err) {
    return next(serverErrorResponse(err));
  }

  if (!isPasswordSame) {
    return next(invalidCredentialsResponse());
  }

  user.hashed_password = "";

  return res.status(StatusCodes.CREATED).json({
    token: generateToken(
      {
        email: user.email,
        id: user.id,
      },
      "30"
    ),
    user,
  });
};
export const getUserHandler = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const params = plainToClass(IDParamDto, req.params);

  const errors = validateSync(params);
  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }
  let user: User | null;
  try {
    user = await usersRepository.findOne({
      where: {
        id: params.id,
      },
      select: {
        email: true,
        name: true,
        id: true,
        is_blocked: true,
        updated_at: true,
        created_at: true,
        activated: true,
      },
    });
  } catch (err) {
    return next(serverErrorResponse(err));
  }
  if (!user) {
    return next(notFoundResponse());
  }

  res.status(StatusCodes.OK).json(user);
};

const notifyUser = () => {};
// To-Do: make a handler to resend email to the users.
