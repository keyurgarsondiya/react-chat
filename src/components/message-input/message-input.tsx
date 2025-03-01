import React, {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from 'react';
import { useChat } from '../../store/chat';
import { MdCancel } from 'react-icons/md';
import { FaImage, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendMessageAction } from '../../store/chat/actions';

export const MessageInput = (): React.ReactElement => {
  const [text, setText] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    state: { selectedUser },
    dispatch,
  } = useChat();

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file?.type?.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const sendMessageAbortController = new AbortController();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessageAction(
        selectedUser?.id ?? '',
        { text, image: imagePreview },
        dispatch,
        { signal: sendMessageAbortController.signal },
      );
      setText('');
      setImagePreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.log('Failed to send message: ', error);
    }
  };

  return (
    <div className={'p-4 w-full'}>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <MdCancel className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSendMessage} className={'flex items-center gap-2'}>
        <div className={'flex-1 flex gap-2'}>
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type={'file'}
            className={'hidden'}
            accept={'image/*'}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <FaImage
              size={20}
              className={`text-gray-800 ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
            />
          </button>
        </div>
        <button
          className={'btn btn-circle'}
          type={'submit'}
          disabled={!text.trim() && !imagePreview}
        >
          <FaPaperPlane size={20} />
        </button>
      </form>
    </div>
  );
};
