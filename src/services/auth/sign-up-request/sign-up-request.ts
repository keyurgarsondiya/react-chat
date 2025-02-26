import { AuthUser } from '../../../store/auth';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import { fetchJson } from '../../common';

export const signUpRequest = async (
  body: { fullName: string; email: string; password: string },
  options: Record<string, unknown>,
): Promise<AuthUser> => {
  // const res = await axios(api.auth.signUp, {
  //   data: body,
  //   signal: options?.signal as AbortSignal,
  //   method: HttpMethod.Post,
  // });
  const res = await fetchJson(api.auth.signUp, options, HttpMethod.Post, body);
  return res as unknown as AuthUser;
};
