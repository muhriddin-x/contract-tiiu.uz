import { AuthCardTitle as Title } from "@/features/auth-card-title/AuthCardTitle";
import { Form } from "@/shared/ui/HookForm";
import { AuthCard } from "@/features/auth-card/AuthCard";
import { Button } from "@/features/buttons/auth-button/Button";
import { Fields } from "./Fields";
import { usePost } from "@/pages/api/https";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setPinflStore } from "../../../../../store/counterSlice";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { CreateAccountError as Error } from "@/shared/ui/Error/CreateAccount/CreateAccountError";
import { schema } from "../config/schema";

export const FormData = () => {
  let { t } = useTranslation("common");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
    color: "",
  });

  const router = useRouter();
  const onSubmit = (values) => {
    setLoading(true);

    const { birth_date } = values;

    const reversedBirthDate = birth_date.split("-").reverse().join("-");

    usePost("/v1/application-forms/info", {
      document: values?.document?.replace(/\s/g, ""),
      birth_date: reversedBirthDate,
    })
      .then((res) => {
        setLoading(false);
        dispatch(setPinflStore(res?.data));
        router.push("/profile/personal-information");
        localStorage.setItem("user_pinfl", JSON.stringify(res?.data));
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.status == 409) {
          setIsError({
            status: true,
            message: err?.response?.data?.message,
            color: "warning",
          });
        } else {
          router.push("/profile/personal-information");
        }
        // if (
        //   err?.response?.status == 408 ||
        //   err?.response?.status == 406 ||
        //   err?.response?.status == 504
        // ) {
        //   setIsError({
        //     status: true,
        //     message: t("responceError.408"),
        //     color: "error",
        //   });
        //   router.push("/profile/personal-information");
        //   // router.push("/my-profile/personal-info");
        // } else if (err?.response?.status == 409) {
        //   setIsError({
        //     status: true,
        //     message: err?.response?.data?.message,
        //     color: "warning",
        //   });
        // } else if (err?.response?.status == 429) {
        //   setIsError({
        //     status: true,
        //     message: t("responceError.429"),
        //     color: "error",
        //   });
        // } else if (err?.response?.status == 404) {
        //   setIsError({
        //     status: true,
        //     message: t("responceError.404"),
        //     color: "error",
        //   });
        // } else {
        //   setIsError({
        //     status: true,
        //     message: t("responceError.408"),
        //     color: "error",
        //   });
        //   // bu pinfl ishlamganiligi uchun qilingan, pinfl ishlashi bilan buni o'zgartirish kerak
        //   // router.push("/profile/personal-information");
        //   // localStorage.setItem("PassportBirthDate", JSON.stringify(values));

        //   // notification(err?.response?.data?.message, "error", "top-right");
        // }
      });
  };

  return (
    <AuthCard className="max-w-[596px]  flex flex-col items-center bg-white rounded-[10px] px-5 py-7  mt-5  mx-auto">
      <Form className="w-full" schema={schema} onSubmit={onSubmit}>
        <Title
          title={t("auth.createAccountTitle")}
          text={t("auth.passportOrBirthPlace")}
        />
        <Fields setIsError={setIsError} />
        {isError.status && (
          <Error
            message={isError.message}
            color={isError.color}
            status={isError.status}
          />
        )}
        <Button
          text={t("auth.continue")}
          loading={loading}
          className="mt-6"
          type="submit"
        />
      </Form>
    </AuthCard>
  );
};
