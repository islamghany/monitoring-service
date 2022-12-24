import { ServerStatus } from "../../types/enums";
import { reportsRepository } from "./../../db/index";

export const createReport = (checkID: number) =>
  reportsRepository.insert({
    status: ServerStatus.UP,
    availability: 0,
    outages: 0,
    responseTimes: [],
    history: [],
  });
