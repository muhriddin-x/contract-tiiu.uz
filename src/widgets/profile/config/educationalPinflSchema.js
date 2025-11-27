import { createFileSchema } from "@/shared/config/validation/fileSchema";
import * as yup from "yup";

export const educationalPinflSchema = (t) => {
  return yup.object().shape({
    institution_type: yup.string().required("Majburiy maydon"),
    region: yup.string().required("Majburiy maydon"),
    district_id: yup.string().required("Majburiy maydon"),
    institution_name: yup.string().required("Majburiy maydon"),
    document: yup.string().required("Majburiy maydon"),

    uzbmb_file: createFileSchema({ t, optional: true }),

    certification_toggle: yup.string().required("Majburiy maydon"),
    certification_type: yup.string().when("certification_toggle", {
      is: (toggle) => toggle == "2",
      then: () => yup.string().required("Required field"),
    }),
    certificate: yup.string().when("certification_toggle", {
      is: (toggle) => toggle == "2",
      then: () => createFileSchema({ t }),
    }),
  });
};
