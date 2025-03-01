import React, { useEffect, useRef } from 'react';
import { useChat } from '../../store/chat';
import { getMessagesAction } from '../../store/chat/actions';
import { ServiceStatus } from '../../constants';
import { ChatHeader } from '../chat-header';
import { MessageInput } from '../message-input';
import { MessageSkeleton } from '../skeletons/message-skeleton.tsx';
import { useAuth } from '../../store/auth';
import { formatMessageTime } from '../../utils';

export const ChatContainer = (): React.ReactElement => {
  const {
    state: { messages, messagesServiceStatus, selectedUser },
    dispatch,
  } = useChat();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    state: { authUser },
  } = useAuth();

  useEffect(() => {
    const getMessagesAbortController = new AbortController();
    if (selectedUser?.id) {
      (async () => {
        await getMessagesAction(selectedUser.id, dispatch, {
          signal: getMessagesAbortController.signal,
        });
      })();
    }
  }, [selectedUser?.id]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messagesServiceStatus === ServiceStatus.Loading) {
    return (
      <div className={'flex flex-1 flex-col overflow-auto'}>
        <ChatHeader />

        <MessageSkeleton />

        <MessageInput />
      </div>
    );
  }

  return (
    <div className={'flex flex-1 flex-col overflow-auto'}>
      <ChatHeader />

      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${message.senderId === authUser?.id ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?.id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser?.profilePic || '/avatar.png'
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className={'chat-header mb-1 '}>
              <time className={'text-xs opacity-50 ml-1'}>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={'chat-bubble flex flex-col'}>
              {message.image && (
                <img
                  src={message.image}
                  alt={'Attachment'}
                  className={'sm:max-w-[200px] rounded-md mb-2'}
                />
              )}
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
