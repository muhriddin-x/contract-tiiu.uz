import { useEducationsOptions } from "@/entities/Educations";
import { useRegionsOptions } from "@/entities/regions";
import { useDistrictsOptions } from "@/entities/Districts";
import { imageExtensions } from "@/shared/config/fileExtensions/image";
import { pdfExtension } from "@/shared/config/fileExtensions/pdf";
import { Field } from "@/shared/ui/HookForm/Field";
import { FileInputWithPreview } from "@/shared/ui/HookForm/FileInputWithPreview";
import { Input } from "@/shared/ui/HookForm/Input";
import { Select } from "@/shared/ui/HookForm/Select";
import { ProfileTitle as Title } from "@/widgets/title";
import { useWatch } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";

export const EducationInfo = ({ name, label, ...props }) => {
  let { t } = useTranslation("common");
  const passportExtensions = [...imageExtensions, pdfExtension];

  const { region_id } = useWatch("region_id");

  const [educationsOptions] = useEducationsOptions();
  const [regions] = useRegionsOptions();
  const [districts, { isFetching: districtsLoading }] =
    useDistrictsOptions(region_id);
  const isNotUpdateProfile = getLocalStorageItem("isNotUpdateProfileStatus");
  return (
    <div className="p-6 bg-white rounded-lg">
      <Title title={t("educationInfo.title")} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field
          className="col-span-1"
          name="education_id"
          label={t("educationInfo.institutionType")}
          required
        >
          <Select
            options={educationsOptions.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="education_id"
            placeholder={t("educationInfo.institutionTypePlaceholder")}
            disabled={isNotUpdateProfile}
          />
        </Field>

        <Field
          className="col-span-1"
          name="region_id"
          label={t("educationInfo.region")}
          required
        >
          <Select
            options={regions.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="region_id"
            placeholder={t("educationInfo.regionPlaceholder")}
            disabled={isNotUpdateProfile}
          />
        </Field>

        <Field
          className="col-span-1"
          name="district_id"
          label={t("educationInfo.district")}
          required
        >
          <Select
            options={districts.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="district_id"
            placeholder={t("educationInfo.district")}
            disabled={(!districtsLoading && !region_id) || isNotUpdateProfile}
          />
        </Field>
      </div>
      <Field
        name="institution_name"
        label={t("educationInfo.institutionName")}
        className="col-span-3 mt-4"
        required
      >
        <Input
          type="text"
          name="institution_name"
          placeholder={t("educationInfo.institutionName")}
          disabled={isNotUpdateProfile}
        />
      </Field>

      <Field
        className="mt-5"
        label={t("educationInfo.uploadDiplom")}
        name="diplom_certificate"
        required
      >
        <FileInputWithPreview
          type="file"
          name="diplom_certificate"
          accept={passportExtensions}
          disabled={isNotUpdateProfile}
        />
      </Field>
    </div>
  );
};
