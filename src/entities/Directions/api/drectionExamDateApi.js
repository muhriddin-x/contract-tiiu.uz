import { rootApi } from "../../../../store";

export const { useGetExamDateQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getExamDate: builder.query({
      query: ({ direction_id }) => ({
        url: `/v1/directions/exam-date-times/${direction_id}`,
      }),
    }),
  }),
});
