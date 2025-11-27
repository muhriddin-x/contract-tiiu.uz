import { genderObj } from "@/entities/defaultObj/defaultObj";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import { Field } from "@/shared/ui/HookForm/Field";
import { Input } from "@/shared/ui/HookForm/Input";
import { Select } from "@/shared/ui/HookForm/Select";
import useTranslation from "next-translate/useTranslation";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

export const Fields = ({ name, photo, label, ...props }) => {
  const {
    formState: { isLoading },
  } = useFormContext();
  let { t } = useTranslation("common");
  const isNotUpdateProfile = getLocalStorageItem("isNotUpdateProfileStatus");

  return (
    <Fragment>
      <div className=""></div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field
          name="last_name"
          label={t("personalInfo.surname")}
          className="col-span-3"
          required
        >
          <Input
            type="text"
            name="last_name"
            placeholder={t("personalInfo.surnamePlaceholder")}
            disabled={isNotUpdateProfile}
          />
        </Field>
        <Field
          name="first_name"
          label={t("personalInfo.name")}
          className="col-span-1"
          required
        >
          <Input
            type="text"
            name="first_name"
            placeholder={t("personalInfo.namePlaceholder")}
            disabled={isNotUpdateProfile}
          />
        </Field>
        <Field
          name="third_name"
          label={t("personalInfo.fatherName")}
          className="col-span-1"
          required
        >
          <Input
            type="text"
            name="third_name"
            placeholder={t("personalInfo.fatherNamePlaceholder")}
            disabled={isNotUpdateProfile}
          />
        </Field>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field
          name="serial_number"
          label={t("personalInfo.passportSeria")}
          required
        >
          <Input
            type="serialNumber"
            name="serial_number"
            placeholder={t("personalInfo.passportSeriaPlaceholder")}
            disabled={isNotUpdateProfile}
          />
        </Field>
        <Field label={t("personalInfo.birth_date")} name="birth_date" required>
          <Input
            type="birthDate"
            name="birth_date"
            placeholder="day-month-year"
            disabled={isNotUpdateProfile}
          />
        </Field>
        <Field name="gender" label={t("personalInfo.gender")} required>
          <Select
            options={genderObj.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="gender"
            placeholder={t("personalInfo.gender")}
            disabled={isNotUpdateProfile}
          />
        </Field>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field
          name="birth_place"
          label={t("personalInfo.birth_place")}
          className="col-span-1"
          required
        >
          <Input
            type="text"
            name="birth_place"
            placeholder={t("personalInfo.birth_place")}
            disabled={isNotUpdateProfile}
          />
        </Field>
      </div>
      {/* <h3 className="text-lg font-semibold mt-7">
        Doimiy yashash joyi haqida ma’lumotlar
      </h3> */}
      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field name="country_id" label={"Doimiy yashash mamlakati"}>
          <Select
            options={countries.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="country_id"
            placeholder={"O'zbekiston"}
          />
        </Field>

        <Field name="region_id" label={"Doimiy yashash viloyati"}>
          <Select
            options={regions.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="region_id"
            placeholder={"Toshkent shahri"}
          />
        </Field>

        <Field name="district_id" label={"Doimiy yashash shahri/tumani"}>
          <Select
            options={districts.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="district_id"
            placeholder={"Olmazor tumani"}
            // disabled={!districtsLoading && !region_id}
          />
        </Field>
      </div>
      <Field name="address" label={"Manzil"} className="mt-5">
        <Input
          type="text"
          name="address"
          placeholder={"Bog'dod ko'chasi"}
          disabled={true}
        />
      </Field> */}
      <h3 className="text-lg font-semibold mt-7">{t("contactInfo.title")}</h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field name="phone" label={t("contactInfo.phone")}>
          <Input
            type="tel"
            name="phone"
            placeholder={"+998 90 123 45 67"}
            required
            disabled
          />
        </Field>
        <Field name="extra_phone" label={t("contactInfo.extraPhone")} required>
          <Input
            type="tel"
            name="extra_phone"
            placeholder={t("contactInfo.extraPhone")}
            disabled={isNotUpdateProfile}
          />
        </Field>
      </div>
    </Fragment>
  );
};
