import React, { createContext, useContext, useReducer } from 'react';
import { AuthenticationStateType } from './store-types.ts';
import { Actions, reducer } from './reducer.ts';
import { initialState } from './states';

export const AuthContext = createContext<{
  state: AuthenticationStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
