import React, { useState } from 'react';
import { loginRequestAction } from '../../store/auth/actions';
import { useAuth } from '../../store/auth';

const SignUp = (): React.ReactElement => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const { dispatch } = useAuth();

  // const { response, error, loading, fetchData } = useAxios({
  //   url: 'https://jsonplaceholder.typicode.com/posts',
  //   method: HttpMethod.Post,
  //   headers: {
  //     accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: {
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1,
  //   },
  // });

  // useEffect(() => {
  //   fetchData();
  // }, []);
  //
  // useEffect(() => {
  //   if (response) {
  //     console.log('Response:', response);
  //   }
  //   if (error) {
  //     console.error('Error:', error);
  //   }
  // }, [response, error]);

  const handleSubmit = async () => {
    const loginAbortController = new AbortController();
    await loginRequestAction({ email: username, password }, dispatch, {
      signal: loginAbortController.signal,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          {/*<div className="mb-6">*/}
          {/*  <label className="block text-gray-700" htmlFor="password">*/}
          {/*    Confirm Password*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    id="password"*/}
          {/*    type="password"*/}
          {/*    placeholder="Re-Enter your password"*/}
          {/*    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"*/}
          {/*  />*/}
          {/*</div>*/}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
