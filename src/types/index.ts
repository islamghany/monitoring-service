import { Request } from "express";
import { User } from "../db/entities/User";

export interface IRequest extends Request {
  user?: User;
  id?: number;
}
