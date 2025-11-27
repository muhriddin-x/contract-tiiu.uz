import { Form } from "@/shared/ui/HookForm";
import { Fields } from "./Fields";
import { Button } from "@/features/buttons/profile-buttons/Button";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { ProfileTitle as Title } from "@/widgets/title";
import { usePost } from "@/pages/api/https";
import toast, { Toaster } from "react-hot-toast";
import { PersonalSkleton } from "@/features/skleton";
import {
  getLocalStorageItem,
  getLocalStorageItemParse,
} from "@/shared/lib/getLocalStorageItem";
import ResendApplicaiton from "@/widgets/modal/resendApplicaiton/ResendApplicaiton";
import { useState } from "react";
import { manuallySchema } from "@/widgets/profile/config/personalInfo/manuallySchema";
import uploadFile from "@/shared/lib/uploadFile/uploadFile";
import { getReversedDate } from "@/shared/lib/date/getReversedDate";
import { unformatSerialNumber } from "@/shared/lib/unformatSerialNumber/unformatSerialNumber";
const notifyServerError = () => toast.error("Server error, try again later");

const notifyUnauthorized = () => toast.error("You are not registered");
export const FormData = ({ myData }) => {
  let { t } = useTranslation("common");
  if (!myData) return <PersonalSkleton />;
  const PassportBirthDate = getLocalStorageItemParse("PassportBirthDate");
  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");

  const [isLoading, setIsLoading] = useState(false);
  const [resendModal, setResendModal] = useState(false);
  const {
    birth_date,
    having_problem_with_profile,
    having_problem_with_application,
    having_problem_with_education,
    havePreviousEducation,
  } = myData;
  const router = useRouter();

  const user_phone = getLocalStorageItem("user_phone");
  const onSubmit = async (values) => {
    setIsLoading(true);
    const { birth_date } = values;

    const reversedBirthDate = birth_date.split("-").reverse().join("-");
    values.src = "manually";
    values.birth_date = reversedBirthDate;
    values.serial_number = unformatSerialNumber(values.serial_number);

    const fileFields = [
      {
        file: values.photo,
        usage: "avatar",
      },
    ];
    const uploadableFiles = fileFields.filter(
      (item) => item.file instanceof Blob
    );

    try {
      const uploadedFiles = await Promise.all(
        uploadableFiles.map((item) => uploadFile(item))
      );

      fileFields.reduce((lastBlobIndex, item, index) => {
        if (item.file instanceof Blob) {
          fileFields[index] = uploadedFiles[lastBlobIndex];
          return ++lastBlobIndex;
        } else {
          fileFields[index] = fileFields[index].file;
        }
        return lastBlobIndex;
      }, 0);
      values.photo = fileFields?.[0];
      usePost("/v1/application-forms", values)
        .then(() => {
          if (
            having_problem_with_profile &&
            !having_problem_with_education &&
            !having_problem_with_application
          ) {
            setResendModal(true);
          } else if (having_problem_with_education) {
            router.push("/profile/educational-information");
          } else if (having_problem_with_application) {
            router.push("/profile/application-status/edit");
          } else if (
            purposeOfApplication == "transfer" ||
            havePreviousEducation == true
          ) {
            router.push("/profile/transfer");
          } else {
            router.push("/profile/educational-information");
          }
        })
        .catch((err) => {
          if (err?.response?.data?.statusCode === 401) {
            notifyUnauthorized();
          } else {
            notifyServerError();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const reversedDate = getReversedDate(birth_date);

  const defaultValue = {
    last_name: myData?.last_name,
    first_name: myData?.first_name,
    third_name: myData?.third_name,
    serial_number: PassportBirthDate
      ? PassportBirthDate?.document
      : myData?.serial_number,
    birth_date: PassportBirthDate
      ? PassportBirthDate?.birth_date
      : reversedDate,
    gender: myData?.gender,
    citizenship: myData?.citizenship,
    birth_place: myData?.birth_place,
    phone: user_phone,
    extra_phone: myData?.extra_phone,
  };

  const handleClose = () => {
    setResendModal(false);
  };

  return (
    <section className="rounded-lg p-6 bg-white">
      <Title title={t("personalInfo.title")} />
      <Form
        defaultValues={defaultValue}
        className=""
        schema={manuallySchema(t)}
        onSubmit={onSubmit}
      >
        <Fields />
        <div
          className={`flex items-end ${
            having_problem_with_profile
              ? "justify-between flex-wrap sm:mt-0 mt-5"
              : "justify-end"
          }`}
        >
          {having_problem_with_profile && (
            <p className="font-medium">
              Agar ma'lumotlaringiz to'g'ri kiritilganligiga ishonchingiz komil
              bo'lsa, "Davom etish" tugmasini bosing.
            </p>
          )}
          <Button
            loading={isLoading}
            isNotBack={true}
            className={`${
              having_problem_with_profile ? "sm:mt-10 mt-5" : "mt-10"
            }`}
          />
        </div>
      </Form>
      <ResendApplicaiton
        open={resendModal}
        onClose={handleClose}
        setResendModal={setResendModal}
      />
      <Toaster position="top-right" />
    </section>
  );
};
