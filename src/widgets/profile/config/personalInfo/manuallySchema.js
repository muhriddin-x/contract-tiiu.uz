import { createFileSchema } from "@/shared/config/validation/fileSchema";
import { createPhoneSchema } from "@/shared/config/validation/phoneSchema";
import { unformatPhone } from "@/shared/lib/unformatPhone";
import * as yup from "yup";

export const manuallySchema = (t) => {
  return yup.object().shape({
    last_name: yup.string().required("Last name is required"),
    first_name: yup.string().required("First name is required"),
    third_name: yup.string().required("Third name is required"),

    serial_number: yup.string().required("Passport seria is required"),
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

    gender: yup.string().required("Gender required"),
    birth_place: yup.string().required("Birth place required"),

    phone: yup.string().required("Phone number required"),
    // extra_phone: createPhoneSchema(
    //   t("common:personalInfo.validPhoneNumber")
    // ).required(t("common:personalInfo.extraPhoneReq")),
    extra_phone: createPhoneSchema(t("common:personalInfo.validPhoneNumber"))
      .required(t("common:personalInfo.extraPhoneReq"))
      .test(
        "phone",
        "Ikkita bir xil raqam qo'shish mumkin emas",
        (value, context) => {
          return unformatPhone(value) !== unformatPhone(context.parent.phone);
        }
      ),
  });
};
