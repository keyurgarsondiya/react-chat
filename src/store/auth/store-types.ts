import { ServiceStatus } from '../../constants';
import { AuthUser } from '../../types';

export interface AuthenticationStateType {
  authUser?: AuthUser;
  onlineUsers: Array<string>;
  isAuthenticated: boolean;
  serviceStatus: ServiceStatus;
  imgUploadServiceStatus: ServiceStatus;
  isAuthInitialized: boolean;
}
