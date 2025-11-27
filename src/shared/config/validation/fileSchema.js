import * as yup from "yup";
export const createFileSchema = ({
  t,
  properType = t("common:requirements.selectCorrectlyFile"),
  properSize = t("common:requirements.fileSize"),
  required = t("common:requirements.reqFile"),
  optional = false,
} = {}) =>
  yup.lazy((value) => {
    if (optional && !value) {
      return yup.mixed();
    }

    switch (typeof value) {
      case "string":
        return yup.string();
      default:
        return yup
          .mixed()
          .test({
            message: properType,
            test: (file, context) => {
              const isValid = ["png", "jpg", "jpeg", "pdf"].some((extension) =>
                file?.name?.toLowerCase().endsWith(extension.toLowerCase())
              );
              if (!isValid) context?.createError();
              return isValid;
            },
          })
          .test({
            message: properSize,
            test: (file) => {
              const isValid = file?.size > 5 * 1024 * 1024;
              return !isValid;
            },
          })
          .required(required);
    }
  });
