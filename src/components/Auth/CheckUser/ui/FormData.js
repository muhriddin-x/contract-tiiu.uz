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
  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");
  const pathname = router.pathname?.split("/")[2];

  useEffect(() => {
    if (pathname == "check-user-master") {
      localStorage.setItem("purposeOfApplication", "master");
    } else if (pathname == "check-user-transfer") {
      localStorage.setItem("purposeOfApplication", "transfer");
    } else {
      localStorage.setItem("purposeOfApplication", "abituryent");
    }
  }, []);

  const onSubmit = (values) => {
    setLoading(true);
    values.phone = unformatPhone(values.phone);
    usePost("/v1/auth/check", {
      phone: values.phone,
    })
      .then((res) => {
        if (res?.data == false) {
          usePost("/v1/auth/register", {
            phone: values.phone,
          })
            .then((res) => {
              localStorage.setItem("isRegister", true);
              router.push("/auth/verification");
              setLoading(false);
            })
            .catch((err) => {
              setIsServerError(err.response.status);
            });
        } else {
          usePost("/v1/auth/login", {
            phone: values.phone,
          })
            .then((res) => {
              localStorage.setItem("isRegister", false);
              router.push("/auth/verification");
              setLoading(false);
            })
            .catch((err) => {
              setIsServerError(err.response.status);
            });
        }
        localStorage.setItem("user_phone", values.phone);

        // setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setIsServerError(err.response.status);
      });
  };

  const schema = yup.object().shape({
    phone: yup.string().required(t("common:personalInfo.phoneReq")),
  });
  const errorMessage =
    isServerError == 400 ? (
      <p className="text-xs text-input-error">
        {" "}
        {t("common:personalInfo.phoneInvalid")}{" "}
      </p>
    ) : (
      <p className="text-xs text-input-error">
        {" "}
        {t("common:personalInfo.serverError")}{" "}
      </p>
    );
  return (
    <AuthCard className="w-[596px]  flex flex-col items-center bg-white rounded-[10px] px-5 py-7  mt-5  mx-auto">
      <Form className="w-full" schema={schema} onSubmit={onSubmit}>
        <Title title={t("auth.title")} text={t("auth.checkUserSubTitle")} />
        <Fields setIsServerError={setIsServerError} />
        {typeof isServerError == "number" && errorMessage}
        <Button
          text={
            purposeOfApplication == "transfer"
              ? t("auth.next")
              : purposeOfApplication == "abituryent"
              ? t("auth.continue")
              : t("auth.toContinue")
          }
          loading={loading}
          className="mt-6"
          type="submit"
        />
      </Form>
      <Toaster position="top-right" />
    </AuthCard>
  );
};
