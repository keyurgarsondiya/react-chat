import React, { FormEventHandler, useState } from 'react';
import { loginRequestAction } from '../../store/auth/actions';
import { useAuth } from '../../store/auth';
import { FaLock, FaRegMessage } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthImagePattern, Loading } from '../../components';
import { Link } from 'react-router';

const SignUp = (): React.ReactElement => {
  const {
    state: { loading },
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { dispatch } = useAuth();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const loginAbortController = new AbortController();
    await loginRequestAction(
      {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      },
      dispatch,
      {
        signal: loginAbortController.signal,
      },
    );
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/*LOGO*/}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FaRegMessage className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/**/}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineEmail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="john.doe@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="size-4 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type={'button'}
                  onClick={() => setShowPassword(!showPassword)}
                  className={
                    'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash className={'size-4 text-base-content/40'} />
                  ) : (
                    <FaEye className={'size-4 text-base-content/40'} />
                  )}
                </button>
              </div>
            </div>

            <button
              type={'submit'}
              disabled={loading}
              className={'btn btn-primary w-full'}
            >
              {loading ? <Loading /> : 'Create Account'}
            </button>
          </form>

          <div className={'text-center'}>
            <p className={'text-base-content/60'}>
              Already have an account?{' '}
              <Link to={'/login'} className={'link link-primary'}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/*  right side */}
      <AuthImagePattern
        title={'Join our community'}
        subtitle={
          'Connect with friends, share moments, and stay in touch with your loved ones.'
        }
      />
    </div>
  );
};

export default SignUp;
