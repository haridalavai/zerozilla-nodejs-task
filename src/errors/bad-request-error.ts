import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public reason: string) {
    super('Bad request');
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
