import { format } from "date-fns";

export const formatDate = (date, withTime = "") => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    // Handle invalid date value
    // console.log("Invalid date value", parsedDate);
    return ""; // Return an empty string for invalid dates
  }

  return format(parsedDate, `dd.MM.yyyy ${withTime && "HH:mm"}`);
};

// it's Ibrokhim
// export const formatDate = (date, withTime = "") => {
//   format(new Date(date), `dd.MM.yyyy ${withTime && "HH:mm"}`);
// };

// it's Muhkhiriddin
// export const formatDate = (date, withTime = "") => {
//   const parsedDate = new Date(date);
//   if (isNaN(parsedDate)) {
//     // Handle invalid date value
//     console.log("invalid time", parsedDate);
//   }

//   const formattedDate = parsedDate.toLocaleDateString(undefined, {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: withTime ? "2-digit" : undefined,
//     minute: withTime ? "2-digit" : undefined,
//   });

//   return formattedDate;
// };

// import { format } from "date-fns";
