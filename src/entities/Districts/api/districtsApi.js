import { rootApi } from "../../../../store";

export const { useLazyGetDistrictsQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getDistricts: builder.query({
      query: (regionId) => ({
        url: `/v1/application-forms/districts/${regionId}`,
      }),
    }),
  }),
});
