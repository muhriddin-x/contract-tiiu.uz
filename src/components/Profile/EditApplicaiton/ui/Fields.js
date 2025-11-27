import { transferDirectionTuitionFees } from "@/entities/defaultObj/defaultObj";
import { useApplicationType } from "@/entities/Directions/hooks/useApplicationType";
import { useGetDegrees } from "@/entities/Directions/hooks/useGetDegrees";
import { useGetDirection } from "@/entities/Directions/hooks/useGetDirection";
import { useGetEduTypes } from "@/entities/Directions/hooks/useGetEduTypes";
import { useGetLanguages } from "@/entities/Directions/hooks/useGetLanguages";
import { useGetMyDataQuery } from "@/entities/user";
import { Button } from "@/features/buttons/profile-buttons/Button";
import { imageExtensions } from "@/shared/config/fileExtensions/image";
import { pdfExtension } from "@/shared/config/fileExtensions/pdf";
import { formatMoney } from "@/shared/lib/formatMoney";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import { Field } from "@/shared/ui/HookForm/Field";
import { FileInputWithPreview } from "@/shared/ui/HookForm/FileInputWithPreview";
import { Select } from "@/shared/ui/HookForm/Select";
import SuccessfullyApply from "@/widgets/modal/profile/SuccessfullyApply";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

export const Fields = ({
  onClose,
  isOpen,
  application,
  selectedDirection,
  removeBtn,
  setWorkExperience,
  isLoading,
  is_transfer_student,
  is_second_specialty,
}) => {
  const [agreeToggle, setAgreeToggle] = useState(false);
  const passportExtensions = [...imageExtensions, pdfExtension];

  let { t } = useTranslation("common");
  const router = useRouter();

  const { data: myData } = useGetMyDataQuery();

  const { degree_id } = useWatch("degree_id");
  const { education_language_id } = useWatch("education_language_id");
  const { education_type_id } = useWatch("education_type");
  const { direction_id } = useWatch("direction_id");

  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");
  const checkDirectionType = is_transfer_student
    ? "transfer"
    : is_second_specialty
    ? "secondSpecialty"
    : purposeOfApplication;
  const { degreeId } = useApplicationType(checkDirectionType);

  const initialSelectedDegree =
    purposeOfApplication == "transfer"
      ? "3"
      : purposeOfApplication == "master"
      ? "2"
      : "1";

  const degreeOptions = useGetDegrees({
    is_transfer_student: purposeOfApplication == "transfer" ? true : false,
  });
  const languageOptions = useGetLanguages({
    degree_id: degree_id || initialSelectedDegree,
  });
  const directionEduTypes = useGetEduTypes({
    degree_id: degree_id || initialSelectedDegree,
    education_language_id: education_language_id,
    is_transfer_student: purposeOfApplication == "transfer" ? true : false,
    skip: !education_language_id,
  });
  const directionOptionss = useGetDirection({
    degree_id: degree_id || initialSelectedDegree,
    education_type_id,
    education_language_id,
    skip: !education_type_id,
  });

  const workExperience = directionOptionss?.[0]?.find(
    (item) => item?.value === direction_id
  )?.is_work_experience_required;

  useEffect(() => {
    if (workExperience) {
      setWorkExperience(true);
    } else {
      setWorkExperience(false);
    }
  }, [workExperience]);

  const tuitionFee = directionOptionss?.[0]?.find(
    (item) => item?.value === direction_id
  );

  const transferTuitionFees = transferDirectionTuitionFees.find(
    (item) => item?.id == direction_id
  );

  // const tuitionFee =
  //   purposeOfApplication == "transfer"
  //     ? transferTuitionFees?.tuition_fee
  //     : findTuitionFee?.tuition_fee;

  return (
    <Fragment>
      {initialSelectedDegree == "3" && (
        <Field
          name="degree_id"
          label={t("selectDirection.degree")}
          required
          wrapperclassname="mb-5"
        >
          <Select
            options={degreeOptions[0]}
            name="degree_id"
            placeholder={t("selectDirection.selectDegree")}
          />
        </Field>
      )}

      <Field
        name="education_language_id"
        label={t("selectDirection.eduLang")}
        required
      >
        <Select
          options={languageOptions[0]}
          name="education_language_id"
          placeholder={t("selectDirection.selectEduLang")}
        />
      </Field>
      <Field
        className="mt-5"
        name="education_type_id"
        label={t("selectDirection.eduType")}
        required
      >
        <Select
          options={directionEduTypes[0]}
          name="education_type_id"
          placeholder={t("selectDirection.selectEduType")}
          disabled={!education_language_id}
        />
      </Field>
      <Field
        className="mt-5"
        name="direction_id"
        label={t("selectDirection.directionOrSpeciality")}
        required
      >
        <Select
          options={directionOptionss[0]}
          name="direction_id"
          placeholder={t("selectDirection.selectDirectionOrSpeciality")}
          disabled={!education_type_id}
        />
      </Field>
      {workExperience && (
        <Field
          className="mt-5"
          label={t("selectDirection.workExperience")}
          name="work_experience_document"
          required
        >
          <FileInputWithPreview
            type="file"
            name="work_experience_document"
            accept={passportExtensions}
            extraTag={false}
            disabled={!direction_id}
          />
          <p className="text-sm mt-2">
            <Trans
              i18nKey="common:selectDirection.workExperienceExtra"
              components={{
                span: (
                  <a
                    target="_blank"
                    href="https://mehnat.uz/oz"
                    className="text-blue"
                  />
                ),
              }}
              values={{ value: "Mehnatuz" }}
            />
          </p>
        </Field>
      )}
      <h3 className="text-2xl font-bold  mt-5 text-center">
        {direction_id && formatMoney(tuitionFee?.tuition_fee) + " " + "UZS"}

        {/* {direction_id && formatMoney(findTuitionFee?.tuition_fee) + " " + "UZS"} */}
      </h3>
      <p className="text-center mt-2 font-bold">
        {direction_id && t("selectDirection.tuitionFeeForYear")}
      </p>
      <div className="mt-5">
        <input
          type="checkbox"
          className="checkboxProfileAccepted"
          id="checkbox"
          name="checkbox"
          defaultChecked={true}
          onClick={() => setAgreeToggle(!agreeToggle)}
        />
        <label className="ml-2">{t("selectDirection.agreeRequariment")}</label>
      </div>
      <div>
        <Button
          className="w-full mt-4"
          text={t("selectDirection.sendApplication")}
          isNotBack={true}
          loading={isLoading}
        />
        {!application?.degree_id && removeBtn && (
          <button
            type="button"
            onClick={() => router.back()}
            className="py-3 w-full text-center bg-white text-secondary rounded-lg mt-2"
          >
            {t("selectDirection.back")}
          </button>
        )}
      </div>
      <SuccessfullyApply
        userName={myData?.first_name + " " + myData?.last_name}
        directionName={selectedDirection}
        open={isOpen}
        onClose={onClose}
      />
    </Fragment>
  );
};
