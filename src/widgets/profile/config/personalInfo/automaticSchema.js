import { createPhoneSchema } from "@/shared/config/validation/phoneSchema";
import { unformatPhone } from "@/shared/lib/unformatPhone";
import * as yup from "yup";

export const automaticSchema = (t) => {
  return yup.object().shape({
    last_name: yup.string().required("Familyangizni kiriting"),
    first_name: yup.string().required("Ismingizni kiriting"),
    third_name: yup.string().required("Otangizning ismini kiriting"),

    serial_number: yup.string().required("Passport seriyasini kiriting"),
    birth_date: yup.string().required("Tu'gilgan kuningizni kiriting"),
    pin: yup.string().required("Passport raqamingizni kiriting"),

    gender: yup.string().required("Jinsingizni tanlang"),
    citizenship: yup.string().required("Fuqarolikni kiriting"),
    birth_place: yup.string().required("Tug'ilgan joyingizni kiriting"),

    phone: yup.string().required("Telefon raqamingizni kiriting"),
    extra_phone: createPhoneSchema(t("common:personalInfo.validPhoneNumber"))
      .required(t("common:personalInfo.extraPhoneReq"))
      .test(
        "phone",
        "Ikkita bir xil raqam qo'shish mumkin emas",
        (value, context) => {
          return unformatPhone(value) !== unformatPhone(context.parent.phone);
        }
      ),
    // extra_phone: createPhoneSchema(
    //   t("common:personalInfo.validPhoneNumber")
    // ).required(t("common:personalInfo.extraPhoneReq")),
  });
};
