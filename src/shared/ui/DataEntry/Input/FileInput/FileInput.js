import useTranslation from "next-translate/useTranslation";
import { Input } from "../Input";

import classes from "./FileInput.module.css";
import { forwardRef } from "react";

export const FileInput = forwardRef(
  ({ className, fileName, extraTag = true, ...props }, ref) => {
    const { t } = useTranslation("common");
    return (
      <label>
        <Input
          className={`${classes.FileInput} ${className} visually-hidden`}
          {...props}
          type="file"
          addonAfter={t("certifcate.uploadFile")}
          inputWrapperClassName="flex items-center px-2 overflow-hidden"
          ref={ref}
          style={{ display: "none" }}
        >
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {fileName}
          </span>
        </Input>
        {extraTag && (
          <p className="text-sm mt-1"> {t("certifcate.requiredTypeUpload")} </p>
        )}
      </label>
    );
  }
);
