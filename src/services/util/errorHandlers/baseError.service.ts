export class BaseError extends Error {
    statusCode: number;
    message: any
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }