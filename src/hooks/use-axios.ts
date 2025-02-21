import { HttpMethods } from '../constants';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface UseAxiosProps {
  method: HttpMethods;
  url: string;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

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
    try {
      const response = await axios[method](url, body, headers);
      setResponse(response.data);
    } catch (error: unknown) {
      console.log('Error in fetchData: ', (error as AxiosError).message);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};
