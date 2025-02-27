import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import { AuthUser } from '../../../types';

export const profileImageUpload = async (
  body: Record<string, unknown>,
  options: Record<string, unknown>,
): Promise<AuthUser> => {
  const res = await fetchJson(
    api.auth.updateProfile,
    options,
    HttpMethod.Put,
    body,
  );

  return {
    id: res?._id,
    email: res?.email,
    fullName: res?.fullName,
    profilePic: res?.profilePic,
    createdAt: res?.createdAt,
  };
};
