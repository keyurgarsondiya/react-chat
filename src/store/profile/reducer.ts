import { ProfileStateType } from './store-types.ts';
import { ActionMap } from '../action-map.ts';
import { ActionType } from './action-type.ts';
import { PayloadTypes } from './payload-types.ts';
import { ServiceStatus } from '../../constants';

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

type Payload = {
  [ActionType.SetAuthUser]: PayloadTypes['setAuthUser'];
  [ActionType.ProfileImageUpload]: PayloadTypes['profileImageUpload'];
  [ActionType.ProfileImageUploadSuccess]: PayloadTypes['profileImageUploadSuccess'];
};

export const reducer = (
  state: ProfileStateType,
  action: Actions,
): ProfileStateType => {
  switch (action.type) {
    case ActionType.SetAuthUser:
      return {
        ...state,
        authUser: action.payload.user,
      };
    case ActionType.ProfileImageUpload:
      return {
        ...state,
        serviceStatus: action.payload.serviceStatus,
      };
    case ActionType.ProfileImageUploadSuccess:
      return {
        ...state,
        authUser: action.payload.user,
        serviceStatus: ServiceStatus.Success,
      };
    default:
      return {
        ...state,
      };
  }
};
