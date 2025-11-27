import { formatDate } from "@/shared/lib/formatDate";
import { useGetExamDateQuery } from "../api/drectionExamDateApi";
import { skipToken } from "@reduxjs/toolkit/query";

export const useGetExamDate = ({ direction_id }) => {
  const {
    data = [],
    isError,
    isFetching,
  } = useGetExamDateQuery(direction_id ? { direction_id } : skipToken);

  const options = data.flatMap((exam) =>
    exam.dates.flatMap((dateItem) =>
      dateItem.times.map((time) => ({
        label: `${formatDate(dateItem.date)} – ${time}`,
        value: `${dateItem.date} - ${dateItem.times?.[0]} - ${exam?.exam_address_id}`,
      }))
    )
  );

  return [options, { isError, isFetching }];
};
