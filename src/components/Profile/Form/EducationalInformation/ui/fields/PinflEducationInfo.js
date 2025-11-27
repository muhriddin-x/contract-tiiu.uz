import { Field } from "@/shared/ui/HookForm/Field";
import { Input } from "@/shared/ui/HookForm/Input";
import { ProfileTitle as Title } from "@/widgets/title";
import useTranslation from "next-translate/useTranslation";

export const PinflEducationInfo = ({ name, label, ...props }) => {
  let { t } = useTranslation("common");

  return (
    <div className="p-6 bg-white rounded-lg">
      <Title title={t("educationInfo.title")} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 ">
        <Field
          name="institution_type"
          label={t("educationInfo.institutionType")}
          className="col-span-3 mt-4"
        >
          <Input
            type="text"
            name="institution_type"
            placeholder={t("educationInfo.institutionTypePlaceholder")}
            disabled
          />
        </Field>

        <Field
          name="region"
          label={t("educationInfo.region")}
          className="col-span-3 mt-4"
        >
          <Input
            type="text"
            name="region"
            placeholder={t("educationInfo.regionPlaceholder")}
            disabled
          />
        </Field>
        <Field
          name="district_id"
          label={t("educationInfo.district")}
          className="col-span-3 mt-4"
        >
          <Input
            type="text"
            name="district_id"
            placeholder={t("educationInfo.district")}
            disabled
          />
        </Field>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 ">
        <Field
          name="institution_name"
          label={t("educationInfo.institutionName")}
          className="col-span-3 mt-4"
        >
          <Input
            type="text"
            name="institution_name"
            placeholder={t("educationInfo.institutionName")}
            disabled
          />
        </Field>
        <Field
          name="document"
          label={t("educationInfo.documentNumber")}
          className="col-span-3 mt-4"
        >
          <Input
            type="text"
            name="document"
            placeholder={t("educationInfo.documentNumber")}
            disabled
          />
        </Field>
      </div>
    </div>
  );
};
