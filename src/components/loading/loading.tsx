import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Loading = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-transparent">
      <AiOutlineLoading3Quarters className="animate-spin text-gray-700 text-2xl font-bold" />
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
