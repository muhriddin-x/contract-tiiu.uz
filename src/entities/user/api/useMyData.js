import { useGetMyDataQuery } from "./useGetMyDataQuery";
import { useGetMyInvoiceAdmissionYearQuery } from "./useGetMyInvoiceAdmissionYear";

export const useMyData = (type, has_admission_year) => {
  const { data: years, isLoading: isYearLoading } =
    useGetMyInvoiceAdmissionYearQuery();

  // const admission_year = years?.[0]?.admission_year;
  const admission_year = has_admission_year || years?.[0]?.admission_year;

  const { data, isLoading: isDataLoading } = useGetMyDataQuery(
    {
      type,
      admission_year: admission_year,
    },
    {
      skip: !admission_year,
    }
  );

  return {
    data,
    isLoading: isYearLoading || isDataLoading,
  };
};
