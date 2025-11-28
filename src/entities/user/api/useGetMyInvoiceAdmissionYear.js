import { rootApi } from "../../../../store";

export const { useGetMyInvoiceAdmissionYearQuery } = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyInvoiceAdmissionYear: builder.query({
      forceRefetch: () => false,
      query: () => {
        const user =
          typeof window !== "undefined" ? localStorage.getItem("user") : null;

        const applicationId = user ? JSON.parse(user).application_id : null;

        return {
          url: `/v1/invoices/admission_year/${applicationId}/crm`,
          method: "GET",
        };
      },
    }),
  }),
});
