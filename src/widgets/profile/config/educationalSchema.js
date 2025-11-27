import { createFileSchema } from "@/shared/config/validation/fileSchema";
import * as yup from "yup";

export const educationalSchema = (t) => {
  return yup.object().shape({
    education_id: yup.string().required(t("common:requirements.reqFields")),
    region_id: yup.string().required(t("common:requirements.reqFields")),
    district_id: yup.string().required(t("common:requirements.reqFields")),
    institution_name: yup.string().required(t("common:requirements.reqFields")),
    diplom_certificate: createFileSchema({ t, optional: false }),

    uzbmb_file: createFileSchema({ t, optional: true }),

    // uzbmb_toggle: yup.string().required("Majburiy maydon"),
    // uzbmb_file: yup.string().when("uzbmb_toggle", {
    //   is: (toggle) => toggle == "2",
    //   then: () => createFileSchema({ t }),
    // }),

    certification_toggle: yup
      .string()
      .required(t("common:requirements.reqFields")),
    certification_type: yup.string().when("certification_toggle", {
      is: (toggle) => toggle == "2",
      then: () => yup.string().required(t("common:requirements.reqFields")),
    }),
    certificate: yup.string().when("certification_toggle", {
      is: (toggle) => toggle == "2",
      then: () => createFileSchema({ t }),
    }),
  });
};
