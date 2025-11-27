import useTranslation from "next-translate/useTranslation";
import { useGetDirectionSelectionQuery } from "../api";

export const useGetDegrees = ({ is_transfer_student }) => {
  const { lang } = useTranslation();
  const {
    data = [],
    isError,
    isFetching,
  } = useGetDirectionSelectionQuery({ type: "degrees", is_transfer_student });

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
