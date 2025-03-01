import { AuthenticationStateType } from './store-types.ts';
import { ActionMap } from '../action-map.ts';
import { ActionType } from './action-type.ts';
import { PayloadTypes } from './payload-types.ts';
import { ServiceStatus } from '../../constants';

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

type Payload = {
  [ActionType.LoginRequest]: PayloadTypes['loginRequest'];
  [ActionType.LoginRequestSuccess]: undefined;
  [ActionType.Logout]: PayloadTypes['logout'];
  [ActionType.CheckingAuth]: PayloadTypes['checkingAuth'];
  [ActionType.CheckingAuthFinished]: PayloadTypes['checkingAuthFinished'];
  [ActionType.LoginRequestError]: undefined;
  [ActionType.SignUpRequest]: PayloadTypes['signUpRequest'];
  [ActionType.SignUpRequestSuccess]: PayloadTypes['signUpRequestSuccess'];
  [ActionType.ProfileImageUpload]: PayloadTypes['profileImageUpload'];
  [ActionType.ProfileImageUploadSuccess]: PayloadTypes['profileImageUploadSuccess'];
};

export const reducer = (
  state: AuthenticationStateType,
  action: Actions,
): AuthenticationStateType => {
  switch (action.type) {
    case ActionType.LoginRequest:
    case ActionType.SignUpRequest:
      return {
        ...state,
        serviceStatus: action.payload.serviceStatus,
      };
    case ActionType.LoginRequestSuccess:
      return {
        ...state,
        isAuthenticated: true,
        serviceStatus: ServiceStatus.Success,
      };
    case ActionType.LoginRequestError:
      return {
        ...state,
        serviceStatus: ServiceStatus.Error,
        isAuthenticated: false,
      };
    case ActionType.CheckingAuth:
      return {
        ...state,
        serviceStatus: action.payload.serviceStatus,
        isAuthInitialized: action.payload.isAuthInitialized,
      };
    case ActionType.CheckingAuthFinished:
      return {
        ...state,
        isAuthenticated: true,
        serviceStatus: ServiceStatus.Success,
        authUser: action.payload.user,
        isAuthInitialized: true,
      };
    case ActionType.SignUpRequestSuccess:
      return {
        ...state,
        serviceStatus: ServiceStatus.Success,
        isAuthenticated: true,
        authUser: action.payload.user,
      };
    case ActionType.ProfileImageUpload:
      return {
        ...state,
        imgUploadServiceStatus: action.payload.serviceStatus,
      };
    case ActionType.ProfileImageUploadSuccess:
      return {
        ...state,
        authUser: action.payload.user,
        imgUploadServiceStatus: ServiceStatus.Success,
      };
    default:
      return state;
  }
};
