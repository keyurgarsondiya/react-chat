import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';

export const checkAuth = async (
  options: Record<string, unknown>,
): Promise<void> => {
  await fetchJson(api.auth.check, options, HttpMethod.Get, {
    credentials: true,
  });
};
