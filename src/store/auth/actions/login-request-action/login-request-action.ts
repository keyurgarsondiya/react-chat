import React from 'react';
import { Actions } from '../../reducer.ts';
import { loginRequest } from '../../../../services';
import { ActionType } from '../../action-type.ts';

export const loginRequestAction = async (
  body: Record<string, unknown>,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  try {
    const loginRequestResponse = await loginRequest(body, options);
    localStorage.setItem('authToken', loginRequestResponse);
    dispatch({
      type: ActionType.LoginRequestSuccess,
      payload: {
        token: loginRequestResponse,
      },
    });
  } catch (error) {}
};
