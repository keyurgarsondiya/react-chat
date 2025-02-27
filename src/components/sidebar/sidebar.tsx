import React from 'react';
import { ActionType, useChat } from '../../store/chat';
import { ServiceStatus } from '../../constants';
import { SidebarSkeleton } from '../skeletons';
import { RxAvatar } from 'react-icons/rx';
import { LuUsersRound } from 'react-icons/lu';

export const Sidebar = (): React.ReactElement => {
  const {
    state: { usersServiceStatus, users, selectedUser },
    dispatch,
  } = useChat();

  const onlineUsers: Array<string> = [];

  if (usersServiceStatus === ServiceStatus.Loading) {
    return <SidebarSkeleton />;
  }
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <LuUsersRound className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() =>
              dispatch({
                type: ActionType.SetSelectedUser,
                payload: {
                  user,
                },
              })
            }
            className={`flex items-center gap-3 w-full p-3 hover:bg-base-300 transition-colors 
            ${selectedUser?.id === user.id ? 'bg-base-300 ring-1 ring-base-300' : ''}`}
          >
            <div className="relative mx-auto lg:mx-0">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
              ) : (
                <RxAvatar className="size-12 object-cover rounded-full" />
              )}
              {onlineUsers.includes(user.id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user.id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
