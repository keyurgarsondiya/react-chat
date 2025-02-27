import React from 'react';
import { Actions } from '../../reducer.ts';
import toast from 'react-hot-toast';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import { getMessages } from '../../../../services';

export const getMessagesAction = async (
  userId: string,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
) => {
  dispatch({
    type: ActionType.GetMessages,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });
  try {
    const getMessagesResponse = await getMessages(userId, options);
    dispatch({
      type: ActionType.GetMessagesSuccess,
      payload: {
        messages: getMessagesResponse,
      },
    });
  } catch (error) {
    toast.error((error as Error).message);
    console.log('Error: ', error);
    dispatch({
      type: ActionType.GetMessages,
      payload: {
        serviceStatus: ServiceStatus.Error,
      },
    });
  }
};
