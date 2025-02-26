import { loginRequestAction } from '../../store/auth/actions';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthImagePattern } from '../../components';
import { FaLock, FaRegMessage } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ServiceStatus } from '../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface FormData {
  email: string;
  password: string;
}

const Login = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const {
    state: { isAuthenticated, serviceStatus },
    dispatch,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const loginAbortController = new AbortController();
    await loginRequestAction(
      {
        email: formData.email,
        password: formData.password,
      },
      dispatch,
      {
        signal: loginAbortController.signal,
      },
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from]);

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
              <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/**/}
          <form onSubmit={handleLogin} className="space-y-6">
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
              disabled={serviceStatus === ServiceStatus.Loading}
              className={'btn btn-primary w-full'}
            >
              {serviceStatus === ServiceStatus.Loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-gray-700 text-base font-bold" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className={'text-center'}>
            <p className={'text-base-content/60'}>
              Don't have an account?{' '}
              <Link to={'/sign-up'} className={'link link-primary'}>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Pattern */}

      <AuthImagePattern
        title={'Welcome back!'}
        subtitle={
          'Sign in to continue your conversations and catch up with your messages.'
        }
      />
    </div>
  );
};

export default Login;
