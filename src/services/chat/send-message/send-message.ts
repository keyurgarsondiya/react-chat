import { fetchJson } from '../../common';
import { api } from '../../../api';
import { HttpMethod } from '../../../constants';
import { Message } from '../../../types';

export const sendMessage = async (
  userId: string,
  body: Record<string, unknown>,
  options: Record<string, unknown>,
): Promise<Message> => {
  const res = await fetchJson(
    `${api.chat.sendMessage}/${userId}`,
    options,
    HttpMethod.Post,
    body,
  );

  return {
    id: res?._id,
    senderId: res?.senderId,
    receiverId: res?.receiverId,
    text: res?.text,
    image: res?.image,
    createdAt: res?.createdAt,
  };
};
