import { useState, useCallback } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (url, method = "GET", data = null) => {
    setIsLoading(true);

    try {
      const response = await axios({
        method,
        url,
        data
      });

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(
        err.response.data.message || "Something went wrong,please try again."
      );
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

//   const activeHttpRequest = useRef([])

// const httpAbortCtrl = new AbortController();
// activeHttpRequest.current.push(httpAbortCtrl)

// signal: httpAbortCtrl.signal
