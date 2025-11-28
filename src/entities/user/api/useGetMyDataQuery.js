import { rootApi } from "../../../../store";

export const { useGetMyDataQuery, useLazyGetMyDataQuery } =
  rootApi.injectEndpoints({
    endpoints: (builder) => ({
      getMyData: builder.query({
        forceRefetch: () => false,
        query: ({ type, admission_year }) => ({
          url: `/v1/students/me/${type}?admission_year=${admission_year}`,
          // url: "/v1/application-forms/me",
        }),
        providesTags: ["User"],
        transformResponse(data) {
          if (!data) {
            try {
              const user = JSON.parse(localStorage.getItem("user"));

              if (user) {
                return {
                  ...user,
                  isApplicationFormComplete: false,
                };
              }
            } catch {
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }
          }
          return {
            ...data,
            isApplicationFormComplete: true,
          };
        },
      }),
    }),
  });
