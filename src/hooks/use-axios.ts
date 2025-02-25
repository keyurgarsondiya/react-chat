import { HttpMethod } from '../constants';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

export interface UseAxiosProps {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

axios.defaults = {
  ...axios.defaults,
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
};

export const useAxios = ({
  method,
  url,
  headers = {
    accept: '*/*',
  },
  body = undefined,
}: UseAxiosProps) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const controller = new AbortController();
    try {
      let response;
      response = await axios[method](url, {
        ...(!(method === HttpMethod.Get || method === HttpMethod.Delete) && {
          body,
        }),
        headers,
        signal: controller.signal,
      });

      setResponse(response.data);
    } catch (error: unknown) {
      console.log('Error in fetchData: ', (error as AxiosError).message);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};
