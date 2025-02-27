import { ServiceStatus } from '../../constants';
import { AuthUser } from '../../types';

export interface PayloadTypes {
  setAuthUser: {
    user: AuthUser;
  };
  profileImageUpload: {
    serviceStatus: ServiceStatus;
  };
  profileImageUploadSuccess: {
    user: AuthUser;
  };
}
