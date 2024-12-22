import { Request, Response, NextFunction, RequestHandler } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/exceptions";
import { clearAuthCookies, REFRESH_PATH } from "./utils/cookies";

export const errorHandler = (controller: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err: any) {
      let exception: HttpException;
      if (err instanceof HttpException) {
        exception = err;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          err,
          ErrorCode.INTERNALEXCEPTION
        );
      }

      if (req.originalUrl === REFRESH_PATH) {
        console.log("Clearing cookies for REFRESH_PATH");
        clearAuthCookies(res);
      }

      next(exception);
    }
  };
};
