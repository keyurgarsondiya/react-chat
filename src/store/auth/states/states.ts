import { AuthenticationStateType } from '../store-types.ts';

export const initialState: AuthenticationStateType = {
  isAuthenticated: false,
  loading: false,
  token: undefined,
};
