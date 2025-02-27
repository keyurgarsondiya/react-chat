import { ChatStateType } from '../store-types.ts';
import { ServiceStatus } from '../../../constants';

export const initialState: ChatStateType = {
  users: [],
  messages: [],
  selectedUser: undefined,
  usersServiceStatus: ServiceStatus.Idle,
  messagesServiceStatus: ServiceStatus.Idle,
};
