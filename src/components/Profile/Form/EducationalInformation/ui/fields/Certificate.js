import { certificateTypes } from "@/entities/defaultObj/defaultObj";
import { Button } from "@/features/buttons/profile-buttons/Button";
import { imageExtensions } from "@/shared/config/fileExtensions/image";
import { pdfExtension } from "@/shared/config/fileExtensions/pdf";
import { Field } from "@/shared/ui/HookForm/Field";
import { FileInputWithPreview } from "@/shared/ui/HookForm/FileInputWithPreview";
import { RadioGroup } from "@/shared/ui/HookForm/Radio";
import { Select } from "@/shared/ui/HookForm/Select";
import useTranslation from "next-translate/useTranslation";
import { useWatch } from "react-hook-form";

export const Certificate = ({ userData, isLoading }) => {
  let { t } = useTranslation("common");

  const passportExtensions = [...imageExtensions, pdfExtension];
  const { having_problem_with_education } = userData;
  const toggle = useWatch("certification_toggle")?.certification_toggle;

  const educationOptions = [
    { value: "1", label: "certifcate.no" },
    { value: "2", label: "certifcate.yes" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg mt-5">
      <h2 className="text-[20px] font-semibold">{t("certifcate.title")}</h2>

      <RadioGroup
        className="mt-5 grid grid-cols-2 md:grid-cols-4"
        name="certification_toggle"
        options={educationOptions.map((item) => ({
          ...item,
          label: t(item.label),
        }))}
      />
      {toggle == "2" && (
        <div className="grid grid-cols-6 items-center  sm:gap-5 gap-0 sm:mt-0 mt-5">
          <div className="sm:col-span-2 col-span-6">
            <Field
              name="certification_type"
              label={t("certifcate.certificationType")}
              required
            >
              <Select
                options={certificateTypes.map((item) => ({
                  ...item,
                  label: item.label,
                }))}
                name="certification_type"
                placeholder={t("certifcate.certificationType")}
                // disabled={isNotUpdateProfile}
              />
            </Field>
          </div>
          <div className="mt-5 sm:col-span-4 col-span-6">
            <Field
              label={t("certifcate.certifcateUpload")}
              name="certificate"
              required
            >
              <FileInputWithPreview
                type="file"
                name="certificate"
                accept={passportExtensions}
                // disabled={isNotUpdateProfile}
              />
            </Field>
          </div>
        </div>
      )}

      <div className="flex w-full justify-end sm:flex-nowrap flex-wrap sm:gap-2">
        {having_problem_with_education && (
          <p className="font-medium mt-5  text-start">
            Agar ma'lumotlaringiz to'g'ri kiritilganligiga ishonchingiz komil
            bo'lsa, "Davom etish" tugmasini bosing.
          </p>
        )}
        <Button
          loading={isLoading}
          className={`${having_problem_with_education ? "mt-5" : "mt-10"}`}
        />
      </div>
    </div>
  );
};
