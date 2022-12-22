import { Request } from "express";

export { OrderStatus } from "./enums";

export interface IRequest extends Request {
  auth?: {
    email: string;
    id: number;
  };
}
