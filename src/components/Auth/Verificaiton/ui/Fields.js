import { Button } from "@/features/buttons/auth-button/Button";
import { Field } from "@/shared/ui/HookForm/Field";
import { Input } from "@/shared/ui/HookForm/Input";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Fields = ({
  name,
  label,
  invalidCode,
  setInvalidCode,
  isServerError,
  setIsServerError,
  loading,
  ...props
}) => {
  const {
    formState: { isLoading },
  } = useFormContext();
  let { t } = useTranslation("");

  const { code } = useWatch("code");

  //   console.log(code);

  useEffect(() => {
    if (code) {
      setInvalidCode(false);
      setIsServerError(false);
    }
  }, [code]);

  return (
    <Fragment>
      <Field
        name="phone"
        label={t("common:auth.phone")}
        className="sm:mt-6 mobile_360:mt-4 mt-3 text-sm font-medium"
      >
        <Input
          disabled
          type="tel"
          name="phone"
          placeholder={t("common:auth.phonePlaceholder")}
        />
      </Field>
      <Field
        name="code"
        label={t("common:auth.verificationCode")}
        className="sm:mt-6 mobile_360:mt-4 mt-3 text-sm font-medium"
      >
        <Input
          name="code"
          type="verificationCode"
          placeholder={t("common:auth.verificationCode")}
          className={`${
            invalidCode || isServerError
              ? "!border !border-input-error rounded-lg"
              : ""
          }`}
        />
      </Field>

      {invalidCode && (
        <p className="text-xs text-input-error">
          {t("common:auth.verificationCodeIncorrect")}
        </p>
      )}

      {isServerError && (
        <p className="text-xs text-input-error">
          {t("common:auth.verificationCodeServerError")}
        </p>
      )}

      <Button
        text={t("common:auth.continue")}
        loading={loading}
        className="mt-6"
        type="submit"
      />
    </Fragment>
  );
};
