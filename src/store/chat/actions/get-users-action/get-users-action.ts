import React from 'react';
import { Actions } from '../../reducer.ts';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import toast from 'react-hot-toast';
import { getUsers } from '../../../../services';

export const getUsersAction = async (
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
) => {
  dispatch({
    type: ActionType.GetUsers,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });
  try {
    const getUsersResponse = await getUsers(options);
    dispatch({
      type: ActionType.GetUsersSuccess,
      payload: {
        users: getUsersResponse,
      },
    });
  } catch (error) {
    toast.error((error as Error).message);
    console.log('Error: ', error);
    dispatch({
      type: ActionType.GetUsers,
      payload: {
        serviceStatus: ServiceStatus.Error,
      },
    });
  }
};
