import React, { ChangeEventHandler } from 'react';
import { FaCamera, FaUser } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { MdEmail } from 'react-icons/md';
import { profileImageUploadAction } from '../../store/auth/actions';
import { ServiceStatus } from '../../constants';
import { useAuth } from '../../store/auth';

const Profile = (): React.ReactElement => {
  const {
    state: { authUser, imgUploadServiceStatus },
    dispatch,
  } = useAuth();

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    // setSelectedImg(URL.createObjectURL(file));

    reader.onload = async () => {
      const base64Image = await reader.result;
      console.log('Base64 Image: ', base64Image);
      const profileImageUploadAbortController = new AbortController();
      await profileImageUploadAction({ profilePic: base64Image }, dispatch, {
        signal: profileImageUploadAbortController.signal,
      });
      // setSelectedImg(base64Image as string);
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Profile Image or Placeholder */}
              {authUser?.profilePic ? (
                <img
                  src={authUser?.profilePic}
                  alt="Profile"
                  className={'size-32 rounded-full object-cover border-4'}
                />
              ) : (
                <RxAvatar
                  className={'size-32 rounded-full object-cover border-4'}
                />
              )}

              {/* Loading Overlay */}
              {imgUploadServiceStatus === ServiceStatus.Loading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* File Upload Label */}
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0
                       bg-base-content hover:scale-105
                       p-2 rounded-full cursor-pointer
                       transition-all duration-200
                       ${imgUploadServiceStatus === ServiceStatus.Loading ? 'animate-pulse pointer-events-none' : ''}`}
              >
                <FaCamera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imgUploadServiceStatus === ServiceStatus.Loading}
                />
              </label>
            </div>
            <p className={'text-sm text-zinc-400'}>
              {imgUploadServiceStatus === ServiceStatus.Loading
                ? 'Uploading...'
                : 'Click the camera icon to update your photo.'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <MdEmail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split('T')[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
