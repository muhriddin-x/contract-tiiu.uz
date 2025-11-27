import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./config/createBaseQuery";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: createBaseQuery(publicRuntimeConfig.backendUrl),
  endpoints: () => ({}),
});
