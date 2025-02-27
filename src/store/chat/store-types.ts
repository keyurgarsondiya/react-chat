import { ServiceStatus } from '../../constants';
import { AuthUser, Message } from '../../types';

export interface ChatStateType {
  messages: Array<Message>;
  users: Array<AuthUser>;
  selectedUser?: AuthUser;
  usersServiceStatus: ServiceStatus;
  messagesServiceStatus: ServiceStatus;
}
