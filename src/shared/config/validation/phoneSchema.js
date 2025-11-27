import { isValidPhoneNumber } from "libphonenumber-js";
import * as yup from "yup";

export const createPhoneSchema = (error) =>
  yup.string().test("", function (value) {
    if (value && value.trim()) {
      const startsWithValidCode =
        /^\+998 (90|91|99|77|95|97|88|93|94|50|33|20|98)/.test(value);
      if (startsWithValidCode && isValidPhoneNumber(value, "UZ")) {
        return true;
      }

      return this.createError({
        message: error,
      });
    }

    return true;
  });
