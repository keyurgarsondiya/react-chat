import React from 'react';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import { Actions } from '../../reducer.ts';
import { profileImageUpload } from '../../../../services';
import toast from 'react-hot-toast';

export const profileImageUploadAction = async (
  body: Record<string, unknown>,
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
) => {
  dispatch({
    type: ActionType.ProfileImageUpload,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });
  try {
    const profileImageUploadResponse = await profileImageUpload(body, options);
    toast.success('Image Updated Successfully');
    dispatch({
      type: ActionType.ProfileImageUploadSuccess,
      payload: {
        user: profileImageUploadResponse,
      },
    });
  } catch (error) {
    toast.error((error as Error).message);
    console.log('Error: ', error);
    dispatch({
      type: ActionType.ProfileImageUpload,
      payload: {
        serviceStatus: ServiceStatus.Error,
      },
    });
  }
};
