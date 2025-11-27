// import { rootApi } from "@/store";

import { rootApi } from "../../../../store";

export const { useGetCountriesQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: `/v1/application-forms/countries`,
      }),
      transformResponse(data) {
        return data.sort((a) => {
          if (a.id === 234) {
            return -1;
          }
          return 0;
        });
      },
    }),
  }),
});
