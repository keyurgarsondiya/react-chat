import { ProfileStateType } from '../store-types.ts';
import { ServiceStatus } from '../../../constants';

export const initialState: ProfileStateType = {
  authUser: undefined,
  serviceStatus: ServiceStatus.Idle,
};
