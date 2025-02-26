import { AuthUser } from './store-types.ts';
import { ServiceStatus } from '../../constants';

export interface PayloadTypes {
  loginRequest: {
    username: string;
    password: string;
  };
  loginRequestSuccess: {
    token: string;
  };
  logout: {
    cookieName: string;
  };
  checkingAuth: {
    serviceStatus: ServiceStatus;
  };
  signUpRequest: {
    serviceStatus: ServiceStatus;
  };
  signUpRequestSuccess: {
    user: AuthUser;
  };
}
