import React from 'react';
import { Actions } from '../../reducer.ts';
import { signUpRequest } from '../../../../services';
import { ActionType } from '../../action-type.ts';
import { ServiceStatus } from '../../../../constants';
import toast from 'react-hot-toast';
import { AuthUser } from '../../../../types';

// interface ApiErrorResponse {
//   message: string;
// }

export const signUpRequestAction = async (
  formData: { fullName: string; email: string; password: string },
  dispatch: React.Dispatch<Actions>,
  options: Record<string, unknown>,
): Promise<void> => {
  dispatch({
    type: ActionType.SignUpRequest,
    payload: {
      serviceStatus: ServiceStatus.Loading,
    },
  });
  try {
    const signUpRequestResponse: AuthUser = await signUpRequest(
      formData,
      options,
    );
    toast.success('Sign Up Successful');
    dispatch({
      type: ActionType.SignUpRequestSuccess,
      payload: {
        user: signUpRequestResponse,
      },
    });
  } catch (error) {
    console.log('Error: ', error);
    toast.error((error as Error).message);
    // toast.error(
    //   (error as AxiosError<ApiErrorResponse>).response?.data?.message ||
    //     'Internal Server Error',
    // );
    dispatch({
      type: ActionType.SignUpRequest,
      payload: {
        serviceStatus: ServiceStatus.Error,
      },
    });
  }
};
