import { Request } from "express";
import { User } from "../db/entities/User";
import { ServerStatus } from "./enums";

export interface IRequest extends Request {
  user?: User;
  id?: number;
}

export interface NotifyOption {
  notify: boolean;
  status: ServerStatus;
}
