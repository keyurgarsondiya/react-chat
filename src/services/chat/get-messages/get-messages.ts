import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import { Message } from '../../../types';

export const getMessages = async (
  userId: string,
  options: Record<string, unknown>,
): Promise<Array<Message>> => {
  const res = fetchJson(
    `${api.chat.messages}/${userId}`,
    options,
    HttpMethod.Get,
  );

  if (res && Array.isArray(res)) {
    return res.map((datum) => ({
      senderId: datum?.senderId,
      receiverId: datum?.receiverId,
      text: datum?.text,
      image: datum?.image,
      createdAt: datum?.createdAt,
    }));
  }

  return [];
};
