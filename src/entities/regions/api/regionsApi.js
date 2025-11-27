// import { rootApi } from "@/store";
import { rootApi } from "../../../../store";

export const { useGetRegionsQuery, useLazyGetRegionsQuery } =
  rootApi.injectEndpoints({
    endpoints: (builder) => ({
      getRegions: builder.query({
        query: () => ({
          url: "v1/application-forms/regions",
        }),
      }),
    }),
  });
