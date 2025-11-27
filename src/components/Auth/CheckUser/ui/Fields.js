import { Field } from "@/shared/ui/HookForm/Field";
import { Input } from "@/shared/ui/HookForm/Input";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

export const Fields = ({ setIsServerError }) => {
  let { t } = useTranslation("common");
  const { phone } = useWatch("phone");

  useEffect(() => {
    if (!phone) {
      setIsServerError("");
    }
  }, [phone]);

  return (
    <Field
      name="phone"
      label={t("auth.phone")}
      className="sm:mt-6 mt-6 text-sm font-medium"
    >
      <Input type="tel" name="phone" placeholder={t("auth.phonePlaceholder")} />
    </Field>
  );
};
