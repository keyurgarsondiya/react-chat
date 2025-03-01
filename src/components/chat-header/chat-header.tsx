import React from 'react';
import { ActionType, useChat } from '../../store/chat';
import { useAuth } from '../../store/auth';
import { MdCancel } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';

export const ChatHeader = (): React.ReactElement => {
  const {
    state: { selectedUser },
    dispatch,
  } = useChat();

  const {
    state: { onlineUsers },
  } = useAuth();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              {selectedUser?.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser?.fullName}
                />
              ) : (
                <RxAvatar className={'size-10 object-cover rounded-full'} />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?.id || '')
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>
        {/*  Close Button */}
        <button
          className={'cursor-pointer'}
          onClick={() =>
            dispatch({
              type: ActionType.SetSelectedUser,
              payload: {
                user: undefined,
              },
            })
          }
        >
          <MdCancel className={'size-6'} />
        </button>
      </div>
    </div>
  );
};
