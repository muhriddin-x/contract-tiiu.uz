import { DatePicker } from "@/shared/ui/HookForm/DatePicker";
import { Field } from "@/shared/ui/HookForm/Field";
import { Input } from "@/shared/ui/HookForm/Input";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Fields = ({ name, label, setIsError, ...props }) => {
  const {
    formState: { isLoading },
  } = useFormContext();
  let { t } = useTranslation("common");
  const { document } = useWatch("document");
  useEffect(() => {
    if (document) {
      setIsError(false);
    }
  }, [document]);
  return (
    <Fragment>
      <div className="mt-5">
        <Field name="document" label={t("auth.passportOrIdCard")}>
          <Input type="serialNumber" name="document" placeholder="AC 1231221" />
        </Field>
        <Field className="mt-5" label={t("auth.birthDate")} name="birth_date">
          <Input
            type="birthDate"
            name="birth_date"
            placeholder="day-month-year"
          />

          {/* <DatePicker
            placeholder={t("auth.birthDatePlaceholder")}
            name="birth_date"
            disabled={isLoading}
          /> */}
        </Field>
      </div>
    </Fragment>
  );
};
