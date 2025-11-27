import useTranslation from "next-translate/useTranslation";
import { useGetDirectionSelectionQuery } from "../api";

export const useGetLanguages = ({ degree_id }) => {
  const { lang } = useTranslation();
  const {
    data = [],
    isError,
    isFetching,
  } = useGetDirectionSelectionQuery({ type: "education_languages", degree_id });
  return [
    data.map((item) => ({
      value: item?.id,
      label: item?.[`name_${lang}`],
    })),
    {
      isError,
      isFetching,
    },
  ];
};
