import { checkAuth } from '../../../../services';
import React from 'react';
import { Actions } from '../../reducer.ts';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import { AuthUser } from '../../store-types.ts';

export const checkAuthAction = async (
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  dispatch({
    type: ActionType.CheckingAuth,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });
  try {
    const checkAuthResponse: AuthUser = await checkAuth(options);
    console.log('Check Auth Response: ', checkAuthResponse);
    dispatch({
      type: ActionType.CheckingAuthFinished,
      payload: {
        user: checkAuthResponse,
      },
    });
  } catch (error) {
    dispatch({
      type: ActionType.CheckingAuth,
      payload: {
        serviceStatus: ServiceStatus.Error,
      },
    });
    console.log('Error: ', error);
  }
};
