import { BaseError } from './baseError.service';

export class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}


export class ServiceFailureError extends BaseError {
    constructor(message: string = "Sorry! something went wrong at our end") {
      super(message, 500);
    }
  }

