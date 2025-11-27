import dayjs from "dayjs";

export const getReversedDate = (birthDate) => {
  if (!birthDate) {
    return "";
  }

  const date = dayjs(birthDate);

  if (!date.isValid()) {
    return "";
  }

  return date.format("DD-MM-YYYY");
};
// export const getReversedDate = (birthDate) => {
//   const date = new Date(birthDate);
//   if (isNaN(date)) {
//     return "";
//   }
//   date.setDate(date.getDate() + 1);

//   const reversedDate = date
//     .toISOString()
//     .split("T")[0]
//     .split("-")
//     .reverse()
//     .join("-");

//   return reversedDate;
// };
