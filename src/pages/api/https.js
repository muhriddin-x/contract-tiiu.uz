import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getAuthorizationToken = () => `Bearer ${localStorage.getItem("token")}`;

function createInstance(baseURL, type, authorization, progress) {
  const headers = {
    Accept: "application/json",
    "Content-Type": type,
  };
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (authorization && config.headers && typeof window !== "undefined") {
        config.headers.Authorization = getAuthorizationToken();
      }
      if (progress) {
        config.onUploadProgress = progress;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    async (res) => res,
    async (error) => {
      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");

        if (error.response?.status === 401 && refreshToken) {
          await axios
            .post(
              `${publicRuntimeConfig.backendUrl}/v1/auth/refresh`,
              { refreshToken },
              {
                headers: {
                  ...headers,
                  Authorization: `Bearer ${refreshToken}`,
                },
              }
            )
            .then(async ({ data }) => {
              // console.log(data)
              localStorage.setItem("token", data.token);

              error.config.headers.Authorization = getAuthorizationToken();

              return await axios
                .request(error.config)
                .then((response) => {
                  Promise.resolve(response);
                  return response;
                })
                .catch((err) => Promise.reject(err));
            })
            .catch(() => {
              localStorage.clear();
              window.location.reload();
            });
        }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

const instance = (authorization = true) =>
  createInstance(
    publicRuntimeConfig.backendUrl,
    "application/json",
    authorization
  );

const mediaInstance = createInstance(
  publicRuntimeConfig.backendUrl,
  "multipart/form-data",
  true
);

export const useGet = (url, params, authorization, config = {}) => {
  // if (!authorization) return instanceWithoutAuth.get(url, { params });
  return instance(authorization).get(url, { params, ...config });
};

export const usePost = (url, data, type, config, authorization) => {
  if (type === "media") {
    return createInstance(
      publicRuntimeConfig.backendUrl,
      "multipart/form-data",
      true,
      config
    ).post(url, data);
  } else {
    return instance(authorization).post(url, data, config);
  }
};

export const usePut = (url, data, authorization) => {
  return instance(authorization).put(url, data);
};

export const usePatch = (url, data, type, authorization) => {
  if (type === "media") {
    return mediaInstance.patch(url, data);
  } else {
    return instance(authorization).patch(url, data);
  }
};

export const useDelete = (url, data, authorization) => {
  return instance(authorization).delete(url, { data: { ...data } });
};
