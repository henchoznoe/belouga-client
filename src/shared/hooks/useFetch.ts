import { useCallback, useEffect, useRef, useState } from 'react';

export const useFetch = () => {

  const serverUrl = import.meta.env.VITE_API_URL;

  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: number]: string | null }>({});

  const activeHttpRequests = useRef<Record<number, AbortController>>({});

  const sendRequest = useCallback(async (
    key: number,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    params: string | null,
    body: string | null,
    customHeaders = {}
  ) => {
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [key]: true }));
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current[key] = httpAbortCtrl;

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...customHeaders
      };

      const response = await fetch(serverUrl + (params ? `?${params}` : ''), {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      });

      const responseData = await response.json();

      delete activeHttpRequests.current[key];

      if ( !response.ok ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: responseData.message
        }));
        throw new Error(responseData.message);
      }

      setErrors((prevErrors) => ({ ...prevErrors, [key]: null }));
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [key]: false }));

      return responseData;
    } catch ( err: any ) {
      if ( err.name !== 'AbortError' ) {
        setErrors((prevErrors) => ({ ...prevErrors, [key]: err.message }));
        throw err;
      }
    } finally {
      delete activeHttpRequests.current[key];
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [key]: false }));
    }
  }, []);

  useEffect(() => {
    return () => {
      Object.values(activeHttpRequests.current).forEach((abortCtrl) =>
        abortCtrl.abort()
      );
    };
  }, []);

  return { sendRequest, isLoading, errors };
};
