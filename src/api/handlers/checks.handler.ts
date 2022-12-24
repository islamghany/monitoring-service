import { Check } from "../../db/entities/Check";
import { ServerStatus } from "./../../types/enums";
import { InsertResult } from "typeorm";
import { notFoundResponse, serverErrorResponse } from "./../helpers/errors";
import AppDataSource, {
  checksRepository,
  reportsRepository,
} from "./../../db/index";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { Response, NextFunction } from "express";
import { CreateCheckDto, IDParamDto, ListCheckParamsDto } from "../../db/dto";
import { IRequest } from "../../types";
import { failedValidationResponse } from "../helpers/errors";

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

  let checkPlaceholder: any = input;

  try {
    //run a tracnaction;
    const report = await reportsRepository.insert({
      status: ServerStatus.UP,
      availability: 0,
      outages: 0,
      responseTimes: [],
      history: [],
    });
    if (report.raw?.length === 0) {
      next(serverErrorResponse("no rows was added in checks"));
    }
    const check = await checksRepository.insert({
      ...checkPlaceholder,
      user: {
        id: req.user?.id,
      },
      report: {
        id: report.raw[0].id,
      },
    });
    if (check.raw?.length === 0) {
      next(serverErrorResponse("no rows was added in checks"));
    }

    check.generatedMaps;
    return res.json({
      ...input,
      ...check.raw[0],
    });
  } catch (err) {
    next(serverErrorResponse(err));
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
    console.log(check.report);
    return res.json(check);
  } catch (err) {
    next(serverErrorResponse(err));
  }
};
