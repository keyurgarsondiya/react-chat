import React from 'react';
import { Actions } from '../../reducer.ts';
import { loginRequest } from '../../../../services';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import toast from 'react-hot-toast';

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
    toast.success('Logged in successfully');
    // TODO: Need to fix this the response from login is AuthUser
    dispatch({
      type: ActionType.LoginRequestSuccess,
    });
  } catch (error) {
    toast.error((error as Error).message);
    dispatch({
      type: ActionType.LoginRequestError,
    });
    console.log('Error: ', error);
  }
};
