import { genderObj } from "@/entities/defaultObj/defaultObj";
import { Field } from "@/shared/ui/HookForm/Field";
import { Input } from "@/shared/ui/HookForm/Input";
import { Select } from "@/shared/ui/HookForm/Select";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
// import { useCountriesOptions } from "@/entities/Countries";
// import { useDistrictsOptions } from "@/entities/Districts";
// import { useRegionsOptions } from "@/entities/regions";
// import Image from "next/image";
const { publicRuntimeConfig } = getConfig();

export const Fields = ({ name, photo, label, ...props }) => {
  const {
    formState: { isLoading },
  } = useFormContext();
  let { t } = useTranslation("common");
  // const { region_id } = useWatch("region_id");

  // const [countries, { isFetching: isCountriesFetching }] =
  //   useCountriesOptions();

  // const [regions] = useRegionsOptions();

  // const [districts, { isFetching: districtsLoading }] =
  //   useDistrictsOptions(region_id);
  return (
    <Fragment>
      <div className="">
        {/* {photo && ( */}
        <img
          // src={photo}
          src={`${publicRuntimeConfig.backendUrl}/${photo}`}
          alt="Preview"
          className="object-cover w-[125px] h-[150px] border rounded-[10px]"
          accept="image/*"
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field
          name="last_name"
          label={t("personalInfo.surname")}
          className="col-span-3"
        >
          <Input
            type="text"
            name="last_name"
            placeholder={t("personalInfo.surnamePlaceholder")}
            disabled={true}
          />
        </Field>
        <Field
          name="first_name"
          label={t("personalInfo.name")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="first_name"
            placeholder={t("personalInfo.namePlaceholder")}
            disabled={true}
          />
        </Field>
        <Field
          name="third_name"
          label={t("personalInfo.fatherName")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="third_name"
            placeholder={t("personalInfo.fatherNamePlaceholder")}
            disabled={true}
          />
        </Field>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field
          name="serial_number"
          label={t("personalInfo.passportSeria")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="serial_number"
            placeholder={t("personalInfo.passportSeriaPlaceholder")}
            disabled={true}
          />
        </Field>
        <Field
          name="birth_date"
          label={t("personalInfo.birth_date")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="birth_date"
            placeholder={t("personalInfo.birth_datePlaceholder")}
            disabled={true}
          />
        </Field>
        <Field
          name="pin"
          label={t("personalInfo.jshshr")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="pin"
            placeholder={t("personalInfo.jshshrPlaceholder")}
            disabled={true}
          />
        </Field>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-5">
        <Field name="gender" label={t("personalInfo.gender")}>
          <Select
            options={genderObj.map((item) => ({
              ...item,
              label: item.label,
            }))}
            name="gender"
            placeholder={t("personalInfo.gender")}
            disabled
          />
        </Field>
        <Field
          name="citizenship"
          label={t("personalInfo.citizenship")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="citizenship"
            placeholder={t("personalInfo.citizenship")}
            disabled={true}
          />
        </Field>
        <Field
          name="birth_place"
          label={t("personalInfo.birth_place")}
          className="col-span-1"
        >
          <Input
            type="text"
            name="birth_place"
            placeholder={t("personalInfo.birth_place")}
            disabled={true}
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
            disabled={!districtsLoading && !region_id}
          />
        </Field>
      </div>
      <Field name="address" label={"Manzil"} className="mt-5">
        <Input
          type="text"
          name="address"
          placeholder={"Bog'dod ko'chasi"}
          // disabled={true}
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
          />
        </Field>
      </div>
    </Fragment>
  );
};
