import { rootApi } from "../../../../store";

export const { useGetMyApplicationQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyApplication: builder.query({
      query: () => ({
        url: "/v1/applicants/my-application",
      }),
    }),
  }),
});
