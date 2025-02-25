import { ErrorObject } from '../../../../types';
import { ErrorType } from '../../../../constants';

export const getFetchError = (
  statusCode?: number,
  message?: string,
  context?: string,
): ErrorObject => {
  switch (true) {
    case statusCode === 0:
      return {
        type: ErrorType.SSO,
        statusCode: 0,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 400:
      return {
        type: ErrorType.BadRequest,
        statusCode: 400,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 401:
      return {
        type: ErrorType.NotAuthenticated,
        statusCode: 401,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 403:
      return {
        type: ErrorType.Forbidden,
        statusCode: 403,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 404:
      return {
        type: ErrorType.NotFound,
        statusCode: 404,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 405:
      return {
        type: ErrorType.MethodNotAllowed,
        statusCode: 405,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 406:
      return {
        type: ErrorType.NotAcceptable,
        statusCode: 406,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 408:
      return {
        type: ErrorType.Timeout,
        statusCode: 408,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 500:
      return {
        type: ErrorType.SystemDown,
        statusCode: 500,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 503:
      return {
        type: ErrorType.Unavailable,
        statusCode: 503,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    case statusCode === 504:
      return {
        type: ErrorType.Timeout,
        statusCode: 504,
        title: 'SSO Error',
        message: message || 'Service Error',
        context,
      };
    default:
      return {
        type: ErrorType.Unknown,
        title: 'Unknown Error',
        message: 'Service Error',
        context,
      };
  }
};
