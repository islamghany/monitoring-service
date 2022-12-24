import { Request } from "express";

export interface IRequest extends Request {
  auth?: {
    email: string;
    id: number;
  };
}
