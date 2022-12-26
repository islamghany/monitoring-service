import { StatusCodes } from "http-status-codes";

import {
  notFoundResponse,
  serverErrorResponse,
  errorResponse,
  authenticationRequiredResponse,
} from "./../helpers/errors";
import { checksRepository } from "./../../db/index";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Response, NextFunction } from "express";
import { CreateCheckDto, IDParamDto, ListCheckParamsDto } from "../../db/dto";
import { IRequest } from "../../types";
import { failedValidationResponse } from "../helpers/errors";
import { createReport, updateReport } from "./reports.handlers";
import scheduler from "../helpers/schedular";
import { Report } from "src/db/entities/Report";

export const createCheck = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const input = plainToClass(CreateCheckDto, req.body);

  const errors = validateSync(input);

  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }
  try {
    new URL(input.url);
  } catch (err) {
    return next(errorResponse("invalid url", StatusCodes.UNPROCESSABLE_ENTITY));
  }
  let checkPlaceholder: any = input;
  let checkId: number = 0;
  try {
    // #TODO : wrap this block with a transaction

    const check = await checksRepository.insert({
      ...checkPlaceholder,
      user: {
        id: req.user?.id,
      },
    });

    if (check.raw?.length === 0) {
      // rollback
      next(serverErrorResponse("no rows was added in checks"));
    }
    checkId = check.raw[0].id;

    const report = await createReport(check.raw[0].id);

    if (report.raw?.length === 0) {
      // rollback
      next(serverErrorResponse("no rows was added in report"));
    }

    //intervalId = setInterval(updateReport, input.interval * 20 * 1000, checkId);

    scheduler.New(checkId, scheduler.timeParaser(input.interval), () =>
      updateReport(checkId)
    );

    scheduler.Start(checkId);

    await checksRepository.update(checkId, {
      report: {
        id: report.raw[0].id,
      },
    });

    return res.json({
      ...input,
      ...check.raw[0],
    });
  } catch (err) {
    scheduler.Stop(checkId);
    return next(serverErrorResponse(err));
  }
};

export const listChecks = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const input = plainToClass(ListCheckParamsDto, req.query);

  const errors = validateSync(input);

  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  try {
    const tag = input.tag || "";
    const name = input.name || "";

    const checks = await checksRepository
      .createQueryBuilder("check")
      .select("*")
      .leftJoinAndSelect("check.report", "report")
      .where(
        "(to_tsvector('simple', name) @@ plainto_tsquery('simple', :name) OR :name = '')",
        { name }
      )
      .andWhere("( :tag = ANY(tags) OR :tag = '')", { tag })
      .getRawMany();

    return res.json(checks);
  } catch (err) {
    next(serverErrorResponse(err));
  }
};
export const getCheck = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const input = plainToClass(IDParamDto, req.params);

  const errors = validateSync(input);

  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  try {
    const check = await checksRepository.findOne({
      where: {
        id: input.id,
        user: {
          id: req.user?.id,
        },
      },
      relations: {
        report: true,
      },
    });

    if (!check) {
      return next(notFoundResponse());
    }

    return res.json(check);
  } catch (err) {
    next(serverErrorResponse(err));
  }
};

export const updateCheck = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const params = plainToClass(IDParamDto, req.params);

  let errors = validateSync(params);

  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  const input = plainToClass(CreateCheckDto, req.body);

  errors = validateSync(input);

  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  try {
    new URL(input.url);
  } catch (err) {
    return next(errorResponse("invalid url", StatusCodes.UNPROCESSABLE_ENTITY));
  }

  try {
    const check = await checksRepository.findOne({
      where: {
        id: params.id,
      },
      relations: {
        user: true,
      },
    });

    if (!check) {
      return next(notFoundResponse());
    }
    if (check.user.id !== req.user?.id) {
      return next(authenticationRequiredResponse());
    }

    await checksRepository.update(params.id, {
      ...input,
    });
  } catch (err) {
    return next(serverErrorResponse(err));
  }

  return res.json({ message: "the check updated successfully" });
};
export const deleteCheck = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const input = plainToClass(IDParamDto, req.params);

  const errors = validateSync(input);

  if (errors.length > 0) {
    return next(failedValidationResponse(errors[0]));
  }

  try {
    const check = await checksRepository.findOne({
      where: {
        id: input.id,
        user: {
          id: req.user?.id,
        },
      },
      relations: {
        report: true,
      },
    });

    if (!check) {
      return next(notFoundResponse());
    }

    // stop  running interval for this check;

    await checksRepository.delete(input.id);

    scheduler.Stop(check.id);
  } catch (err) {
    next(serverErrorResponse(err));
  }

  res.json({ message: "check deleted successfuly" });
};
