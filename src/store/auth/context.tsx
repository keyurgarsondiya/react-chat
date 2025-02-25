import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthenticationStateType } from './store-types.ts';
import { Actions, reducer } from './reducer.ts';
import { initialState } from './states';
import { checkAuthAction } from './actions';
import { ActionType } from './action-type.ts';
import { AUTH_TOKEN } from '../../constants';

export const AuthContext = createContext<{
  state: AuthenticationStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      (async () => {
        const checkAuthAbortController = new AbortController();
        dispatch({
          type: ActionType.CheckingAuth,
        });
        await checkAuthAction(token, dispatch, {
          signal: checkAuthAbortController.signal,
        });
      })();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state: { ...state }, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): {
  state: AuthenticationStateType;
  dispatch: React.Dispatch<Actions>;
} => useContext(AuthContext);
