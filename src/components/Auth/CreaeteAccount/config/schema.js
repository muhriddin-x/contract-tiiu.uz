import * as yup from "yup";
import { removeStrSpaces } from "@/shared/lib/removeStrSpaces";

export const schema = yup.object().shape({
  document: yup
    .string()
    .required("Passport or ID card number is required")
    .test({
      message: "Passport or ID card number is invalid",
      test: (value) => {
        return removeStrSpaces(value).match(/^[A-Z]{2}[0-9]{7}$/);
      },
    }),

  birth_date: yup
    .string()
    .required("Birth date is required")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/,
      "Invalid date format (DD.MM.YYYY)"
    )
    .test("age", "Invalid age", function (value) {
      if (!value) return true; // Skip validation if value is empty
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const [day, month, year] = value.split("-");
      const selectedYear = parseInt(year, 10);

      const minAgeYear = currentYear - 15;
      const minSelectableYear = 1920;

      if (selectedYear > minAgeYear) {
        throw this.createError({
          path: "birth_date",
          message: `You cannot apply if you are under 15 years old`,
        });
      }

      if (selectedYear < minSelectableYear) {
        throw this.createError({
          path: "birth_date",
          message: `Make sure that the entered birth date is correct`,
        });
      }

      return true;
    }),
});
