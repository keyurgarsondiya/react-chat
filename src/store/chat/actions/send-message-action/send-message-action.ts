import React from 'react';
import { Actions } from '../../reducer.ts';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import toast from 'react-hot-toast';
import { sendMessage } from '../../../../services';

export const sendMessageAction = async (
  userId: string,
  body: Record<string, unknown>,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
) => {
  dispatch({
    type: ActionType.SendMessage,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });

  try {
    const sendMessageResponse = await sendMessage(userId, body, options);
    dispatch({
      type: ActionType.SendMessageSuccess,
      payload: {
        message: sendMessageResponse,
      },
    });
  } catch (error) {
    console.log('Error: ', error);
    toast.error((error as Error).message);
    dispatch({
      type: ActionType.SendMessage,
      payload: {
        serviceStatus: ServiceStatus.Error,
      },
    });
  }
};
