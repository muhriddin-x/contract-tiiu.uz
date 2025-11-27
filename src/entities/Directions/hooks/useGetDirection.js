import useTranslation from "next-translate/useTranslation";
import { useGetDirectionSelectionQuery } from "../api";

export const useGetDirection = ({
  education_type_id,
  education_language_id,
  degree_id,
  skip,
}) => {
  const { lang } = useTranslation();
  const {
    data = [],
    isError,
    isFetching,
  } = useGetDirectionSelectionQuery(
    {
      type: "directions",
      education_type_id,
      education_language_id,
      degree_id,
    },
    {
      skip,
    }
  );
  return [
    data.map((item) => ({
      value: item?.id,
      label: item?.[`name_${lang}`],
      is_work_experience_required: item?.is_work_experience_required,
      // tuition_fee: item?.second_specialty_tuition_fee || item?.tuition_fee,
      tuition_fee: item?.tuition_fee,
    })),
    {
      isError,
      isFetching,
    },
  ];
};
