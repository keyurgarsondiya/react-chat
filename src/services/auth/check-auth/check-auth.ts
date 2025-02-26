import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import { AuthUser } from '../../../store/auth';

export const checkAuth = async (
  options: Record<string, unknown>,
): Promise<AuthUser> => {
  const res = await fetchJson(api.auth.check, options, HttpMethod.Get, {
    credentials: true,
  });

  return {
    id: res?._id,
    fullName: res?.fullName,
    email: res?.email,
    profilePic: res?.profilePic,
  } as AuthUser;
};
