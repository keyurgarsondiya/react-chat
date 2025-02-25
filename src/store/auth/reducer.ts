import { AuthenticationStateType } from './store-types.ts';
import { ActionMap } from '../action-map.ts';
import { ActionType } from './action-type.ts';
import { PayloadTypes } from './payload-types.ts';

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

type Payload = {
  [ActionType.LoginRequest]: PayloadTypes['loginRequest'];
  [ActionType.LoginRequestSuccess]: PayloadTypes['loginRequestSuccess'];
  [ActionType.Logout]: PayloadTypes['logout'];
};

export const reducer = (
  state: AuthenticationStateType,
  action: Actions,
): AuthenticationStateType => {
  switch (action.type) {
    case ActionType.LoginRequest:
      return {
        ...state,
        loading: true,
      };
    case ActionType.LoginRequestSuccess:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        loading: false,
      };
    default:
      return state;
  }
};
