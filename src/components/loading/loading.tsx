import { FaSpinner } from 'react-icons/fa';

export const Loading = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaSpinner className="animate-spin text-indigo-500 text-6xl" />
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
