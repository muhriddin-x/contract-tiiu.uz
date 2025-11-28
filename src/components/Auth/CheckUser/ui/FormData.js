import { AuthCardTitle as Title } from "@/features/auth-card-title/AuthCardTitle";
import { Form } from "@/shared/ui/HookForm";
import * as yup from "yup";
import { AuthCard } from "@/features/auth-card/AuthCard";
import { Button } from "@/features/buttons/auth-button/Button";
import { usePost } from "@/pages/api/https";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { unformatPhone } from "@/shared/lib/unformatPhone";
import toast, { Toaster } from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";
import { Fields } from "./Fields";
import { createPhoneSchema } from "@/shared/config/validation/phoneSchema";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";

export const FormData = () => {
  let { t } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isServerError, setIsServerError] = useState([]);

  const onSubmit = (values) => {
    setLoading(true);
    values.phone = unformatPhone(values.phone);

    usePost("/v1/auth/student/login", {
      phone: values.phone,
    })
      .then((res) => {
        localStorage.setItem("isRegister", false);
        localStorage.setItem("user_phone", values.phone);

        router.push("/auth/verification");
      })
      .catch((err) => {
        setIsServerError(err.response.status);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const schema = yup.object().shape({
    phone: yup.string().required(t("common:personalInfo.phoneReq")),
  });
  // const errorMessage =
  //   isServerError == 400 ? (
  //     <p className="text-xs text-input-error">
  //       {" "}
  //       {t("common:personalInfo.phoneInvalid")}{" "}
  //     </p>
  //   ) : isServerError == 415 ? (
  //     <p className="text-xs text-input-error">
  //       {" "}
  //       Siz ro'yhatdan o'tmagansiz. Rahbariyat yoniga borishingizni so'raymiz.{" "}
  //     </p>
  //   ) : (
  //     <p className="text-xs text-input-error">
  //       {" "}
  //       {t("common:personalInfo.serverError")}{" "}
  //     </p>
  //   );
  let message = t("common:personalInfo.serverError");

  if (isServerError == 400) {
    message = t("common:personalInfo.phoneInvalid");
  } else if (isServerError == 415) {
    message =
      "Siz ro'yhatdan o'tmagansiz. Rahbariyat yoniga borishingizni so'raymiz.";
  } else {
    message = t("common:personalInfo.serverError");
  }

  const errorMessage = (
    <p className="text-xs text-input-error mt-1">{message}</p>
  );

  return (
    <AuthCard className="w-[596px]  flex flex-col items-center bg-white rounded-[10px] px-5 py-7  mt-5  mx-auto">
      <Form className="w-full" schema={schema} onSubmit={onSubmit}>
        <Title title={t("auth.title")} text={t("auth.checkUserSubTitle")} />
        <Fields setIsServerError={setIsServerError} />
        {typeof isServerError == "number" && errorMessage}
        <Button
          text={t("auth.toContinue")}
          // text={
          //   purposeOfApplication == "transfer"
          //     ? t("auth.next")
          //     : purposeOfApplication == "abituryent"
          //     ? t("auth.continue")
          //     : t("auth.toContinue")
          // }
          loading={loading}
          className="mt-6"
          type="submit"
        />
      </Form>
      <Toaster position="top-right" />
    </AuthCard>
  );
};
