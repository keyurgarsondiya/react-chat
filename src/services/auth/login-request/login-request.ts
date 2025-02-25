import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';

export const loginRequest = async (
  body: Record<string, unknown>,
  options: Record<string, unknown>,
): Promise<string> => {
  const res = await fetchJson(api.auth.login, options, HttpMethod.Post, body);
  console.log('Res: ', res);
  return res as string;
};
