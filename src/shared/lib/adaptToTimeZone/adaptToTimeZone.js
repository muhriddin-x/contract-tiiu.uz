// export const adaptToTimeZone = (date) => {
//   const dateTime = date.getTime();
//   const timezoneOffsetInMinutes = new Date().getTimezoneOffset();

//   return new Date(dateTime - timezoneOffsetInMinutes * 60 * 1000);
// };
export const adaptToTimeZone = (date) => {
  const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
  const adjustedDate = new Date(
    date.getTime() - timezoneOffsetInMinutes * 60 * 1000
  );

  // Check if the year of birth is 1990 or earlier
  if (adjustedDate.getFullYear() <= 1990) {
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    return adjustedDate;
  }

  // If the year of birth is after 1990, use the previous code
  const adjustedDateWithPreviousCode = new Date(
    date.getTime() - timezoneOffsetInMinutes * 60 * 1000
  );

  // Check if the year of birth is before 1990
  if (adjustedDateWithPreviousCode.getFullYear() < 1990) {
    adjustedDateWithPreviousCode.setDate(
      adjustedDateWithPreviousCode.getDate() - 1
    );
  }

  return adjustedDateWithPreviousCode;
};
