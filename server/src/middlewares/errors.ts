import { NextFunction } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleWare = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {};
