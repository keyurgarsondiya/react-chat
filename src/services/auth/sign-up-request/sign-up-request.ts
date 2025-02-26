import { AuthUser } from '../../../store/auth';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import axios from 'axios';

export const signUpRequest = async (
  body: { fullName: string; email: string; password: string },
  options: Record<string, unknown>,
): Promise<AuthUser> => {
  const res = await axios(api.auth.signUp, {
    data: body,
    signal: options?.signal as AbortSignal,
    method: HttpMethod.Post,
  });
  return res as unknown as AuthUser;
};
