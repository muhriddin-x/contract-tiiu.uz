import useTranslation from "next-translate/useTranslation";
import { useLazyGetDistrictsQuery } from "../api";
import { useEffect } from "react";

export const useDistrictsOptions = (regionId) => {
  const { lang } = useTranslation();

  const [getDistricts, { data, isError, error, isFetching }] =
    useLazyGetDistrictsQuery();

  useEffect(() => {
    if (regionId) {
      getDistricts(regionId);
    }
  }, [regionId]);

  return [
    data?.map(({ id, ...district }) => ({
      value: id,
      label: district["name_" + lang],
    })) || [],
    {
      data,
      isError,
      error,
      isFetching,
    },
  ];
};
