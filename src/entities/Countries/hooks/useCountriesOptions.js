import useTranslation from "next-translate/useTranslation";
import { useGetCountriesQuery } from "../api";

export const useCountriesOptions = () => {
  const { lang } = useTranslation();

  const { data = [], isError, error, isFetching } = useGetCountriesQuery();
  return [
    data.map(({ id, ...country }) => ({
      value: id,
      label: country["name_" + lang],
    })),
    {
      isError,
      error,
      isFetching,
    },
  ];
};
