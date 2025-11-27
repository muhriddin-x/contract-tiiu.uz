import { createFileSchema } from "@/shared/config/validation/fileSchema";
import * as yup from "yup";

export const directionSelectSchema = (
  t,
  isWorkExperience = false,
  degreeID
) => {
  const schema = yup.object().shape({
    degree_id:
      degreeID === 3
        ? yup.string().required(t("common:requirements.reqFields"))
        : yup.mixed().nullable(),
    direction_id: yup.string().required(t("common:requirements.reqFields")),
    education_type_id: yup
      .string()
      .required(t("common:requirements.reqFields")),
    education_language_id: yup
      .string()
      .required(t("common:requirements.reqFields")),
    work_experience_document: isWorkExperience
      ? createFileSchema({ t })
      : yup.mixed(),
  });

  return schema;
};
