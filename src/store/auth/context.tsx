import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthenticationStateType } from './store-types.ts';
import { Actions, reducer } from './reducer.ts';
import { initialState } from './states';
import { ActionType } from './action-type.ts';

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
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch({
        type: ActionType.LoginRequestSuccess,
        payload: {
          token,
        },
      });
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
