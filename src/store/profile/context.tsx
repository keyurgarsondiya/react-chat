import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ProfileStateType } from './store-types.ts';
import { Actions, reducer } from './reducer.ts';
import { initialState } from './states';
import { useAuth } from '../auth';
import { ActionType } from './action-type.ts';

export const ProfileContext = createContext<{
  state: ProfileStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    state: { authUser },
  } = useAuth();
  useEffect(() => {
    if (authUser) {
      dispatch({
        type: ActionType.SetAuthUser,
        payload: {
          user: authUser,
        },
      });
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ state: { ...state }, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): {
  state: ProfileStateType;
  dispatch: React.Dispatch<Actions>;
} => useContext(ProfileContext);
