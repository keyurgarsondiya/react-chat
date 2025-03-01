import { checkAuth } from '../../../../services';
import React from 'react';
import { Actions } from '../../reducer.ts';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';

import { AuthUser } from '../../../../types';

export const checkAuthAction = async (
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  dispatch({
    type: ActionType.CheckingAuth,
    payload: {
      serviceStatus: ServiceStatus.Loading,
      isAuthInitialized: false,
    },
  });
  try {
    const checkAuthResponse: AuthUser = await checkAuth(options);
    console.log('Check Auth Response: ', checkAuthResponse);
    console.log('Check Auth Response: ', checkAuthResponse);
    dispatch({
      type: ActionType.CheckingAuthFinished,
      payload: {
        user: checkAuthResponse,
      },
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.log('Auth check aborted.');
      return;
    }
    dispatch({
      type: ActionType.CheckingAuth,
      payload: {
        serviceStatus: ServiceStatus.Error,
        isAuthInitialized: true,
      },
    });
    console.log('Error: ', error);
  }
};
