import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import axios from "axios";

export const createBaseQuery = (baseUrl, options = {}) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    ...options,
  });

  return async (args, api, extraOptions = {}) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const data = await axios.post(
            "v1/auth/refresh",
            {
              refreshToken,
            },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
              baseURL: baseUrl,
            }
          );

          localStorage.setItem("token", data.data.token);

          return await baseQuery(args, api, extraOptions);
        } catch (error) {
          localStorage.clear();
          window.location.reload();
          return;
        }
      }

      return result;
    }

    return result;
  };
};
