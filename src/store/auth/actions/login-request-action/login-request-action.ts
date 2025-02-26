import React from 'react';
import { Actions } from '../../reducer.ts';
import { loginRequest } from '../../../../services';
import { ActionType } from '../../action-type.ts';
import { AUTH_TOKEN } from '../../../../constants';

export const loginRequestAction = async (
  body: Record<string, unknown>,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  try {
    const loginRequestResponse = await loginRequest(body, options);
    console.log('Login Request Response: ', loginRequestResponse);
    // TODO: Need to fix this the response from login is AuthUser
    localStorage.setItem(AUTH_TOKEN, loginRequestResponse);
    dispatch({
      type: ActionType.LoginRequestSuccess,
      payload: {
        token: loginRequestResponse,
      },
    });
  } catch (error) {
    localStorage.removeItem(AUTH_TOKEN);
    dispatch({
      type: ActionType.LoginRequestError,
    });
    console.log('Error: ', error);
  }
};
