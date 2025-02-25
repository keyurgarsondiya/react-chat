import { getFetchAcceptHeader } from './get-fetch-accept-header';
import { validateResponse } from './validate-response';

import { raiseError } from '../../error-reporting/raise-error';
import { httpMethodAllowsBody } from '../http-method-allows-body';
import { HttpMethod } from '../../../../constants';

type ParameterValue = string | Array<string> | boolean | any;
export const fetchJson = async <T>(
  url: string,
  options?: Record<string, unknown>,
  httpMethod = HttpMethod.Get,
  body?: {
    [index: string]: ParameterValue;
  },
  defaultResponse?: T,
  supportsFlatJson?: boolean,
): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const requestParameters = {
      method: httpMethod,
      credentials: 'include',
      redirect: 'manual',
      headers: {
        Accept: getFetchAcceptHeader(supportsFlatJson),
        'Content-Type': 'application/json',
      },
      body: httpMethodAllowsBody(httpMethod) ? JSON.stringify(body) : undefined,
      ...options,
    } as RequestInit;
    const res = await fetch(url, requestParameters);
    await validateResponse(res, raiseError);
    // return res.status === 200 || res.status === 201 ? res.json() : [];
    if (res.status === 200 || res.status === 201) {
      return res.json();
    } else if (defaultResponse !== undefined) {
      return defaultResponse;
    } else {
      return [] as unknown as T;
    }
  } catch (err) {
    throw err;
  }
};
