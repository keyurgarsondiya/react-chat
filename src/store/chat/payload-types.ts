import { ServiceStatus } from '../../constants';
import { AuthUser, Message } from '../../types';

export interface PayloadTypes {
  getUsers: {
    serviceStatus: ServiceStatus;
  };
  getUsersSuccess: {
    users: Array<AuthUser>;
  };
  getMessages: {
    serviceStatus: ServiceStatus;
  };
  getMessagesSuccess: {
    messages: Array<Message>;
  };
  sendMessage: {
    serviceStatus: ServiceStatus;
  };
  sendMessageSuccess: {
    message: Message;
  };
  setSelectedUser: {
    user: AuthUser;
  };
}
