import { ServiceStatus } from '../../constants';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  profilePic?: string;
}

export interface AuthenticationStateType {
  authUser?: AuthUser;
  isAuthenticated: boolean;
  serviceStatus: ServiceStatus;
  isInitialized: boolean;
  token?: string;
}
