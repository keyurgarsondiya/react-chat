import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import { AuthUser } from '../../../types';

export const getUsers = async (
  options: Record<string, unknown>,
): Promise<Array<AuthUser>> => {
  const res = await fetchJson(api.chat.users, options, HttpMethod.Get);
  if (res && Array.isArray(res)) {
    return res.map(
      (datum) =>
        ({
          id: datum?._id,
          fullName: datum?.fullName,
          email: datum?.email,
          profilePic: datum?.profilePic,
          createdAt: datum?.createdAt,
        }) as AuthUser,
    );
  }
  return [];
};
