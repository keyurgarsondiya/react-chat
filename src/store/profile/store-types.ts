import { AuthUser } from '../../types';
import { ServiceStatus } from '../../constants';

export interface ProfileStateType {
  authUser?: AuthUser;
  serviceStatus: ServiceStatus;
}
