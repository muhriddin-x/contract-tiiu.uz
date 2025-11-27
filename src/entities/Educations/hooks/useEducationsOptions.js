import useTranslation from "next-translate/useTranslation";
import { useGetEducationsQuery } from "../api";

export const useEducationsOptions = () => {
  const { lang } = useTranslation();

  const { data = [], isError, error, isFetching } = useGetEducationsQuery();
  return [
    data.map((item) => ({
      value: item?.id,
      label: item?.[`name_${lang}`],
    })),
    {
      isError,
      error,
      isFetching,
    },
  ];
};
