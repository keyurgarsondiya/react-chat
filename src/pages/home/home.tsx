import { useChat } from '../../store/chat';
import { ChatContainer, NoChatSelected, Sidebar } from '../../components';
import { useAuth } from '../../store/auth';
import { useEffect } from 'react';
import { getUsersAction } from '../../store/chat/actions';

const Home = () => {
  const {
    state: { selectedUser },
    dispatch,
  } = useChat();

  const {
    state: { authUser },
  } = useAuth();

  useEffect(() => {
    const getUsersAbortController = new AbortController();
    (async () => {
      await getUsersAction(dispatch, {
        signal: getUsersAbortController.signal,
      });
    })();

    return () => {
      getUsersAbortController.abort();
    };
  }, [authUser]);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
