import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Not found';

  constructor() {
    super('Not found');
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
