import { checkAuth } from '../../../../services';
import React from 'react';
import { Actions } from '../../reducer.ts';
import { ActionType } from '../../action-type.ts';
import { AUTH_TOKEN } from '../../../../constants';

export const checkAuthAction = async (
  token: string,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  try {
    await checkAuth(options);

    dispatch({
      type: ActionType.LoginRequestSuccess,
      payload: {
        token,
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
