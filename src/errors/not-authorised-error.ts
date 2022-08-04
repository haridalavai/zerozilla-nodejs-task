import { CustomError } from './custom-error';
export class NotAuthorisedError extends CustomError {
  statusCode = 401;
  reason = 'Not authorised';

  constructor() {
    super('Not authorised');
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
