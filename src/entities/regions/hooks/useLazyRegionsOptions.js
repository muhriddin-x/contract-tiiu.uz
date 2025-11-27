import useTranslation from "next-translate/useTranslation";
import { useLazyGetRegionsQuery } from "../api";

export const useLazyRegionsOptions = () => {
  const { lang } = useTranslation();

  const [getRegionsOptions, { data = [], isError, error, isFetching }] =
    useLazyGetRegionsQuery();

  return [
    () =>
      new Promise((resolve, reject) => {
        getRegionsOptions().then(({ data, error }) => {
          if (data) {
            resolve(
              data.map(({ id, ...region }) => ({
                value: id,
                label: region["name_" + lang],
              }))
            );
          } else if (error) {
            reject(error);
          }
        });
      }),
    {
      isError,
      error,
      isFetching,
    },
  ];
};
