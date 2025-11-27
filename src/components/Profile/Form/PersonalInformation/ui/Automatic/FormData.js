import { Form } from "@/shared/ui/HookForm";
import { Fields } from "./Fields";
import { Button } from "@/features/buttons/profile-buttons/Button";
import { automaticSchema } from "@/widgets/profile/config/personalInfo/automaticSchema";
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
import { getReversedDate } from "@/shared/lib/date/getReversedDate";
const notifyServerError = () => toast.error("Server error, try again later");

const notifyUnauthorized = () => toast.error("You are not registered");
export const FormData = ({ myData }) => {
  let { t } = useTranslation("common");
  if (!myData) return <PersonalSkleton />;
  const storeProfile = getLocalStorageItemParse("user_pinfl");
  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");
  const [isLoading, setIsLoading] = useState(false);

  const [resendModal, setResendModal] = useState(false);
  const {
    having_problem_with_profile,
    having_problem_with_application,
    having_problem_with_education,
    havePreviousEducation,
  } = myData;
  const router = useRouter();

  const user_phone = getLocalStorageItem("user_phone");
  const onSubmit = (values) => {
    setIsLoading(true);
    const { birth_date } = values;
    values.photo = storeProfile?.passport?.photo;
    values.src = "automatic";
    const reversedBirthDate = birth_date.split("-").reverse().join("-");
    values.birth_date = reversedBirthDate;
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
          router.replace("/profile/educational-information");
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
  };

  const reversedDate = getReversedDate(myData?.birth_date);

  const defaultValue = {
    // photo: storeProfile?.passport?.photo,
    last_name: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.last_name
      : myData?.last_name,
    first_name: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.first_name
      : myData?.first_name,
    third_name: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.third_name
      : myData?.third_name,
    serial_number: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.document?.document
      : myData?.serial_number,
    birth_date: storeProfile?.passport?.first_name
      ? getReversedDate(storeProfile?.passport?.birth_date)
      : reversedDate,
    pin: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.pin[0]
      : myData?.pin,
    gender: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.gender
      : myData?.gender,
    citizenship: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.citizenship
      : myData?.citizenship,
    birth_place: storeProfile?.passport?.first_name
      ? storeProfile?.passport?.birth_place
      : myData?.birth_place,
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
        schema={automaticSchema(t)}
        onSubmit={onSubmit}
      >
        <Fields
          photo={
            storeProfile?.passport?.photo
              ? storeProfile?.passport?.photo
              : myData?.photo
          }
        />
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
