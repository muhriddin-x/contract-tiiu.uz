import { rootApi } from "../../../../store";

export const { useGetDirectionsQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getDirections: builder.query({
      query: () => ({
        url: "/v1/directions",
      }),
    }),
  }),
});
