import { useCallback, useEffect, useRef, useState } from "react";
import useAuth from "@/shared/hooks/useAuth.ts";

export const useFetch = () => {

  const serverUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: number]: string | null }>({});
  const activeHttpRequests = useRef<Record<number, AbortController>>({});
  const authCtx = useAuth();

  const prepareRequest = (key: number) => {
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [key]: true }));
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current[key] = httpAbortCtrl;
    return { signal: httpAbortCtrl.signal };
  };

  const handleResponse = async (key: number, response: Response) => {
    const responseData = await response.json();
    delete activeHttpRequests.current[key];
    if ( !response.ok ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: responseData.message || "Une erreur est survenue.",
      }));
      throw new Error(responseData.message || "Une erreur est survenue.");
    }
    setErrors((prevErrors) => ({ ...prevErrors, [key]: null }));
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [key]: false }));
    return responseData;
  };

  const handleError = (key: number, err: any) => {
    if ( err.name !== "AbortError" ) {
      setErrors((prevErrors) => ({ ...prevErrors, [key]: err.message }));
      throw err;
    }
  };

  const finalizeRequest = (key: number) => {
    delete activeHttpRequests.current[key];
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, [key]: false }));
  };

  const clearErrors = (key: number) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[key];
      return updatedErrors;
    });
  };

  const send = useCallback(
    async (
      key: number,
      method: "GET" | "POST" | "PATCH" | "DELETE",
      { params, body, requireAuth }: { params?: string; body?: string; requireAuth?: boolean }
    ) => {
      const { signal } = prepareRequest(key);
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if ( requireAuth && authCtx.admin?.token ) {
          headers["Authorization"] = "Bearer " + authCtx.admin.token;
        }
        const url = params ? `${serverUrl}?${params}` : serverUrl;
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal,
        });
        return await handleResponse(key, response);
      } catch ( err: any ) {
        handleError(key, err);
      } finally {
        finalizeRequest(key);
      }
    },
    [serverUrl, authCtx]
  );

  useEffect(() => {
    return () => {
      Object.values(activeHttpRequests.current).forEach((abortCtrl) =>
        abortCtrl.abort()
      );
    };
  }, []);

  return { send, isLoading, errors, clearErrors };
};
