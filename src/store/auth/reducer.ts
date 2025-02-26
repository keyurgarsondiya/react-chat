import { AuthenticationStateType } from './store-types.ts';
import { ActionMap } from '../action-map.ts';
import { ActionType } from './action-type.ts';
import { PayloadTypes } from './payload-types.ts';
import { ServiceStatus } from '../../constants';

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

type Payload = {
  [ActionType.LoginRequest]: PayloadTypes['loginRequest'];
  [ActionType.LoginRequestSuccess]: PayloadTypes['loginRequestSuccess'];
  [ActionType.Logout]: PayloadTypes['logout'];
  [ActionType.CheckingAuth]: PayloadTypes['checkingAuth'];
  [ActionType.CheckingAuthFinished]: undefined;
  [ActionType.LoginRequestError]: undefined;
  [ActionType.SignUpRequest]: PayloadTypes['signUpRequest'];
  [ActionType.SignUpRequestSuccess]: PayloadTypes['signUpRequestSuccess'];
};

export const reducer = (
  state: AuthenticationStateType,
  action: Actions,
): AuthenticationStateType => {
  switch (action.type) {
    case ActionType.LoginRequest:
      return {
        ...state,
        serviceStatus: ServiceStatus.Loading,
      };
    case ActionType.LoginRequestSuccess:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        serviceStatus: ServiceStatus.Success,
        isInitialized: true,
      };
    case ActionType.LoginRequestError:
      return {
        ...state,
        serviceStatus: ServiceStatus.Error,
        isAuthenticated: false,
        token: undefined,
      };
    case ActionType.CheckingAuthFinished:
      return {
        ...state,
        serviceStatus: ServiceStatus.Idle,
        isInitialized: true,
      };
    case ActionType.CheckingAuth:
    case ActionType.SignUpRequest:
      return {
        ...state,
        serviceStatus: action.payload.serviceStatus,
      };
    case ActionType.SignUpRequestSuccess:
      return {
        ...state,
        serviceStatus: ServiceStatus.Success,
        isAuthenticated: true,
        isInitialized: true,
        authUser: action.payload.user,
      };
    default:
      return state;
  }
};
