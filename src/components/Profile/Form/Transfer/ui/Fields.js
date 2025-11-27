import { imageExtensions } from "@/shared/config/fileExtensions/image";
import { pdfExtension } from "@/shared/config/fileExtensions/pdf";
import { Field } from "@/shared/ui/HookForm/Field";
import { FileInputWithPreview } from "@/shared/ui/HookForm/FileInputWithPreview";
import { Input } from "@/shared/ui/HookForm/Input";
import { Select } from "@/shared/ui/HookForm/Select";
import { ProfileTitle as Title } from "@/widgets/title";
import useTranslation from "next-translate/useTranslation";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import { useCountriesOptions } from "@/entities/Countries";
import { currentCourse } from "@/entities/defaultObj/defaultObj";
import { Button } from "@/features/buttons/profile-buttons/Button";

export const Fields = ({ name, label, userData, isLoading }) => {
  let { t } = useTranslation("common");
  const { having_problem_with_education } = userData;

  const isNotUpdateProfile = getLocalStorageItem("isNotUpdateProfileStatus");
  const passportExtensions = [...imageExtensions, pdfExtension];

  const [countries] = useCountriesOptions();

  return (
    <div className="p-6 bg-white rounded-lg">
      <Title title={t("correntEduction.title")} />
      <div className="mt-5">
        <Field
          className="col-span-1"
          name="country_id"
          label={t("correntEduction.country")}
          required
        >
          <Select
            options={countries}
            name="country_id"
            placeholder={t("correntEduction.country")}
            disabled={isNotUpdateProfile}
          />
        </Field>
      </div>
      <Field
        name="institution_name"
        label={t("correntEduction.institutionName")}
        className="col-span-3 mt-4"
        required
      >
        <Input
          type="text"
          name="institution_name"
          placeholder={t("correntEduction.institutionName")}
          disabled={isNotUpdateProfile}
        />
      </Field>
      <Field
        name="direction_name"
        label={t("correntEduction.educationDirection")}
        className="col-span-3 mt-4"
        required
      >
        <Input
          type="text"
          name="direction_name"
          placeholder={t("correntEduction.educationDirection")}
          disabled={isNotUpdateProfile}
        />
      </Field>

      <Field
        className="col-span-1 mt-4"
        name="which_course_now"
        label={t("correntEduction.currenctCourse")}
        required
      >
        <Select
          options={currentCourse}
          name="which_course_now"
          placeholder={t("correntEduction.currenctCourse")}
          disabled={isNotUpdateProfile}
        />
      </Field>

      <Field
        className="mt-4"
        label={t("correntEduction.transkript")}
        name="transcript_file"
        required
      >
        <FileInputWithPreview
          type="file"
          name="transcript_file"
          accept={passportExtensions}
          disabled={isNotUpdateProfile}
        />
      </Field>
      <div className="flex w-full justify-end sm:flex-nowrap flex-wrap">
        {having_problem_with_education && (
          <p className="font-medium mt-5  text-start">
            If you are sure that your information is entered correctly, click
            the <span className="text-primary">"Continue"</span> button.
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
