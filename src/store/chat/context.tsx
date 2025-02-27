import React, { createContext, useContext, useReducer } from 'react';
import { ChatStateType } from './store-types.ts';
import { Actions, reducer } from './reducer.ts';
import { initialState } from './states';

export const ChatContext = createContext<{
  state: ChatStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={{ state: { ...state }, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): {
  state: ChatStateType;
  dispatch: React.Dispatch<Actions>;
} => useContext(ChatContext);
