import { ServiceStatus } from '../../constants';
import { AuthUser } from '../../types';

export interface PayloadTypes {
  loginRequest: {
    serviceStatus: ServiceStatus;
  };
  logout: {
    cookieName: string;
  };
  checkingAuth: {
    serviceStatus: ServiceStatus;
    isAuthInitialized: boolean;
  };
  checkingAuthFinished: {
    user: AuthUser;
  };
  signUpRequest: {
    serviceStatus: ServiceStatus;
  };
  signUpRequestSuccess: {
    user: AuthUser;
  };
  profileImageUpload: { serviceStatus: ServiceStatus };
  profileImageUploadSuccess: {
    user: AuthUser;
  };
}
