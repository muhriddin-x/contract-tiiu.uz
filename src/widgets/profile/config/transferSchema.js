import { createFileSchema } from "@/shared/config/validation/fileSchema";
import * as yup from "yup";

export const transferSchema = (t) => {
  return yup.object().shape({
    country_id: yup.string().required(t("common:requirements.reqFields")),
    institution_name: yup.string().required(t("common:requirements.reqFields")),
    direction_name: yup.string().required(t("common:requirements.reqFields")),
    which_course_now: yup.string().required(t("common:requirements.reqFields")),
    transcript_file: createFileSchema({ t, optional: false }),
  });
};
