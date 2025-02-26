import { AuthUser } from './store-types.ts';
import { ServiceStatus } from '../../constants';

export interface PayloadTypes {
  loginRequest: {
    serviceStatus: ServiceStatus;
  };
  logout: {
    cookieName: string;
  };
  checkingAuth: {
    serviceStatus: ServiceStatus;
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
}
