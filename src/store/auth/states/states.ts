import { AuthenticationStateType } from '../store-types.ts';
import { ServiceStatus } from '../../../constants';

export const initialState: AuthenticationStateType = {
  authUser: undefined,
  serviceStatus: ServiceStatus.Idle,
  isAuthenticated: false,
  isInitialized: false,
  token: undefined,
};
