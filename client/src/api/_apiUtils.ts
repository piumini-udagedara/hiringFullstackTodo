/* eslint-disable @typescript-eslint/no-explicit-any */
export const getApiError = (error: any, defaultMessage?: string) => {
  if (!error) {
    return defaultMessage || "Something went wrong";
  }

  // Handle fetch-based errors (from our HttpService)
  if (error.response) {
    const data = error.response.data;
    if (data) {
      if (typeof data === "string") {
        return data;
      }
      if (typeof data.message === "string") {
        return data.message;
      }
      if (typeof data.error === "string") {
        return data.error;
      }
    }
  }

  // Handle network errors or other fetch errors
  if (error.message) {
    return error.message;
  }

  return defaultMessage || "Something went wrong";
};
