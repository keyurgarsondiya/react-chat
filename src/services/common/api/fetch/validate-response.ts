import { getFetchError } from './get-fetch-error';
import { ErrorType } from '../../../../constants';

export const validateResponse = async (
  response: Response,
  raiseError: (errorType: ErrorType) => void,
): Promise<Response> => {
  if (response.type === 'opaqueredirect') {
    raiseError(ErrorType.NotAuthenticated);
    throw getFetchError(0);
  }
  if (!response.ok) {
    const res = await response.json().catch(() => getFetchError(0));
    const err = getFetchError(response.status, res?.errorMessageDetailed);
    raiseError(err.type);
    throw err;
  }
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 204
  ) {
    return response;
  }
  const err = getFetchError();
  raiseError(err.type);
  throw err;
};
