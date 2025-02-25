import { ErrorType } from '../constants';

export interface ErrorObject {
  type: ErrorType;
  statusCode?: number;
  title?: string;
  message?: string;
  context?: string;
}
