import { formatDate } from "@/shared/lib/formatDate";
import { useGetDirectionsQuery } from "../api";

export const useGetExamDateOptions = ({ direction_id }) => {
  const { data = [], isError, isFetching } = useGetDirectionsQuery();
  return [
    data
      .filter((item) => item?.direction_id == direction_id)
      .flatMap((item) =>
        item.exam_date_times_v2
          .filter((dateTimes) => dateTimes.date) // Faqat haqiqiy sanalar uchun ishlatamiz
          .map((dateTime) => ({
            value: `${dateTime.date} - ${dateTime.times?.[0]} - ${dateTime?.id}`,
            label: `${formatDate(dateTime.date)} - ${dateTime.times?.[0]}`,
          }))
      ),
    {
      isError,
      isFetching,
    },
  ];
};

// import { useGetDirectionsQuery } from "../api";

// export const useGetExamDateOptions = ({ direction_id }) => {
//   const { data = [], isError, isFetching } = useGetDirectionsQuery();
//   return [
//     data
//       .filter((item) => item?.direction_id == direction_id)
//       .flatMap((item) =>
//         item.exam_date_times.flatMap((exam) =>
//           exam.exam_date_time
//             .filter((dateTime) => dateTime.date) // Faqat haqiqiy sanalar uchun ishlatamiz
//             .map((dateTime) => ({
//               value: `${dateTime.date} - ${dateTime.times?.[0]} - ${exam?.id}`,
//               label: `${dateTime.date} - ${dateTime.times?.[0]}`,
//             }))
//         )
//       ),
//     {
//       isError,
//       isFetching,
//     },
//   ];
// };
