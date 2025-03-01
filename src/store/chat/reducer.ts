import { ChatStateType } from './store-types.ts';
import { ActionMap } from '../action-map.ts';
import { ActionType } from './action-type.ts';
import { PayloadTypes } from './payload-types.ts';
import { ServiceStatus } from '../../constants';

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

type Payload = {
  [ActionType.GetUsers]: PayloadTypes['getUsers'];
  [ActionType.GetUsersSuccess]: PayloadTypes['getUsersSuccess'];
  [ActionType.GetMessages]: PayloadTypes['getMessages'];
  [ActionType.GetMessagesSuccess]: PayloadTypes['getMessagesSuccess'];
  [ActionType.SetSelectedUser]: PayloadTypes['setSelectedUser'];
  [ActionType.SendMessage]: PayloadTypes['sendMessage'];
  [ActionType.SendMessageSuccess]: PayloadTypes['sendMessageSuccess'];
};

export const reducer = (
  state: ChatStateType,
  action: Actions,
): ChatStateType => {
  switch (action.type) {
    case ActionType.GetUsers:
      return {
        ...state,
        usersServiceStatus: action.payload.serviceStatus,
      };
    case ActionType.GetUsersSuccess:
      return {
        ...state,
        users: action.payload.users,
        usersServiceStatus: ServiceStatus.Success,
      };
    case ActionType.GetMessages:
      return {
        ...state,
        messagesServiceStatus: action.payload.serviceStatus,
      };
    case ActionType.GetMessagesSuccess:
      return {
        ...state,
        messages: action.payload.messages,
        messagesServiceStatus: ServiceStatus.Success,
      };
    case ActionType.SetSelectedUser:
      return {
        ...state,
        selectedUser: action.payload.user,
      };
    case ActionType.SendMessage:
      return {
        ...state,
        messagesServiceStatus: action.payload.serviceStatus,
      };
    case ActionType.SendMessageSuccess:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        messagesServiceStatus: ServiceStatus.Success,
      };
    default:
      return {
        ...state,
      };
  }
};
