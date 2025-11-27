import { rootApi } from "../../../../store";

export const { useGetEducationsQuery, useLazyGetEducationsQuery } =
  rootApi.injectEndpoints({
    endpoints: (builder) => ({
      getEducations: builder.query({
        query: () => ({
          url: "/v1/application-forms/educations/",
        }),
      }),
    }),
  });
