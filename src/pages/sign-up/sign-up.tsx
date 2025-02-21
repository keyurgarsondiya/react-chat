import React, { useEffect, useState } from 'react';
import { useAxios } from '../../hooks';
import { HttpMethods } from '../../constants';
import { AxiosError, AxiosResponse } from 'axios';

const SignUp = (): React.ReactElement => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const { response, error, loading } = useAxios({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: HttpMethods.POST,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });
    setResponse(response);
    setError(error);
    setLoading(loading);
  }, []);

  return (
    <div className={'w-full h-screen flex justify-center items-center'}>
      {loading ? 'Loading...' : 'Sign Up Page, Post Successful'}
    </div>
  );
};

export default SignUp;
