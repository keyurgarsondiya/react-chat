import React from 'react';
import { Actions } from '../../reducer.ts';
import { loginRequest } from '../../../../services';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';

export const loginRequestAction = async (
  body: Record<string, unknown>,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  dispatch({
    type: ActionType.LoginRequest,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });
  try {
    const loginRequestResponse = await loginRequest(body, options);
    console.log('Login Request Response: ', loginRequestResponse);
    // TODO: Need to fix this the response from login is AuthUser
    dispatch({
      type: ActionType.LoginRequestSuccess,
    });
  } catch (error) {
    dispatch({
      type: ActionType.LoginRequestError,
    });
    console.log('Error: ', error);
  }
};
