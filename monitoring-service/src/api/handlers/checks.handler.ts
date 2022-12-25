import { StatusCodes } from "http-status-codes";

import {
  notFoundResponse,
  serverErrorResponse,
  errorResponse,
} from "./../helpers/errors";
import { checksRepository } from "./../../db/index";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Response, NextFunction } from "express";
import { CreateCheckDto, IDParamDto, ListCheckParamsDto } from "../../db/dto";
import { IRequest } from "../../types";
import { failedValidationResponse } from "../helpers/errors";
import { createReport, updateReport } from "./reports.handlers";

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
  let intervalId: number | string = 0;
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
    const checkId = check.raw[0].id;

    const report = await createReport();

    if (report.raw?.length === 0) {
      // rollback
      next(serverErrorResponse("no rows was added in report"));
    }

    intervalId = setInterval(updateReport, input.interval * 30 * 1000, checkId);

    const updatedCheck = checksRepository.update(checkId, {
      intervalId: +intervalId,
      report: {
        id: report.raw[0].id,
      },
    });

    return res.json({
      ...input,
      ...check.raw[0],
    });
  } catch (err) {
    if (intervalId) clearInterval(intervalId);
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
    // TODO: create indexs
    // CREATE INDEX IF NOT EXISTS check_name_idx ON movies USING GIN (to_tsvector('simple', name));
    // CREATE INDEX IF NOT EXISTS check_tags_idx ON movies USING GIN (tags);

    const tag = input.tag || "";
    const name = input.name || "";

    const checks = await checksRepository
      .createQueryBuilder()
      .select("*")
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
