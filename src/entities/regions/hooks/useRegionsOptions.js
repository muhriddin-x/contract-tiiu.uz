import useTranslation from "next-translate/useTranslation";
import { useGetRegionsQuery } from "../api";

export const useRegionsOptions = () => {
  const { lang } = useTranslation();

  const { data = [], isError, error, isFetching } = useGetRegionsQuery();
  return [
    data.map(({ id, ...region }) => ({
      value: id,
      label: region["name_" + lang],
    })),
    {
      isError,
      error,
      isFetching,
    },
  ];
};
