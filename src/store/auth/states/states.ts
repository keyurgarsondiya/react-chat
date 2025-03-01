import { AuthenticationStateType } from '../store-types.ts';
import { ServiceStatus } from '../../../constants';

export const initialState: AuthenticationStateType = {
  authUser: undefined,
  onlineUsers: [],
  serviceStatus: ServiceStatus.Idle,
  imgUploadServiceStatus: ServiceStatus.Idle,
  isAuthenticated: false,
  isAuthInitialized: false,
};
