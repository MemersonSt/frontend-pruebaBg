import axios, { AxiosError, type AxiosResponse } from "axios";

const handleAxiosError = (error: AxiosError<{ message: string }, unknown>) => {
  if (error.response) {
    // if (error.response.status === 401) {
    //   console.error("Unauthorized access - redirecting to login");
    //   window.location.href = "/unauthorized";
    // }
    console.error("Response error:", error.response.data);
    throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
  } else if (error.request) {
    console.error("No response received:", error.request);
    throw new Error("No response received from server.");
  } else {
    console.error("Error setting up request:", error.message);
    throw new Error(`Error setting up request: ${error.message}`);
  }
};

const handleUnexpectedError = (error: unknown) => {
  console.error("Unexpected error:", error);
  throw new Error("An unexpected error occurred.");
};

const services = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


services.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      handleUnexpectedError(error);
    }
    return Promise.reject(error);
  }
);

export default services;

export { services };