import { useState, useCallback } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", data = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await axios({
          method,
          url,
          data,
          headers
        });

        setIsLoading(false);
        return response.data;
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "Something went wrong,please try again."
        );
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

//   const activeHttpRequest = useRef([])

// const httpAbortCtrl = new AbortController();
// activeHttpRequest.current.push(httpAbortCtrl)

// signal: httpAbortCtrl.signal
