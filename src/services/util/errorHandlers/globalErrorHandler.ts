// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { BaseError } from './baseError.service';


export const errorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  console.error(err); 
  return res.status(500).json({
    error: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  });
};
