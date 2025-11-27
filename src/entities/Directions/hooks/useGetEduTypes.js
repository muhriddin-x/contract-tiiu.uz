import useTranslation from "next-translate/useTranslation";
import { useGetDirectionSelectionQuery } from "../api";

export const useGetEduTypes = ({
  education_language_id,
  degree_id,
  is_transfer_student,
  skip,
}) => {
  const { lang } = useTranslation();
  const {
    data = [],
    isError,
    isFetching,
  } = useGetDirectionSelectionQuery(
    {
      type: "education_types",
      education_language_id,
      degree_id,
      is_transfer_student,
    },
    {
      skip,
    }
  );
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
