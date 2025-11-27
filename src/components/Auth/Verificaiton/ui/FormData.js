import Link from "next/link";
import * as yup from "yup";
import { AuthCardTitle as Title } from "@/features/auth-card-title/AuthCardTitle";
import { Form } from "@/shared/ui/HookForm";
import { AuthCard as Card } from "@/features/auth-card/AuthCard";
import { usePost } from "@/pages/api/https";
import { unformatPhone } from "@/shared/lib/unformatPhone";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import { formatTime } from "@/shared/lib/formatTime";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { Fields } from "./Fields";

export const FormData = () => {
  let { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const initialTime = 120; // 2 minutes in seconds
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const [invalidCode, setInvalidCode] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const router = useRouter();
  const user_phone = getLocalStorageItem("user_phone");

  // useEffect(() => {
  //   setIsActive(true);
  // }, []);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const ResendCode = (e) => {
    e.preventDefault();
    usePost("/v1/auth/resend-verify-code", {
      phone: user_phone,
    })
      .then(() => {
        setSeconds(initialTime);
        setIsActive(true);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const onSubmit = (values) => {
    setLoading(true);
    values.phone = unformatPhone(values.phone);
    values.code = +values.code;
    usePost("/v1/auth/verify", {
      phone: values.phone,
      code: values.code,
    })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(res?.data));
        if (
          res?.data?.havePreviousEducation == false &&
          res?.data?.haveApplicationForm == true
        ) {
          localStorage.removeItem("purposeOfApplication");
        }

        if (
          res?.data?.haveApplicationForm == true &&
          res?.data?.haveEducation == true &&
          res?.data?.haveApplied == false
        ) {
          router.push("/profile/select-direction");
        } else if (
          res?.data?.haveApplicationForm == true &&
          res?.data?.haveApplied == true
        ) {
          router.push("/profile/application-status");
        } else if (
          res?.data?.haveApplicationForm == true &&
          res?.data?.haveEducation == false
        ) {
          router.push("/profile/personal-information");
        } else {
          router.push("/auth/create-account");
        }

        // old code

        // if (
        //   res?.data?.haveApplicationForm == true &&
        //   res?.data?.haveEducation == true &&
        //   res?.data?.haveApplied == false
        // ) {
        //   router.push("/profile/select-direction");
        // } else if (
        //   res?.data?.haveApplicationForm == true &&
        //   res?.data?.haveEducation == true &&
        //   res?.data?.haveApplied == true
        // ) {
        //   router.push("/profile/application-status");
        // } else if (
        //   res?.data?.haveApplicationForm == true &&
        //   res?.data?.haveEducation == false &&
        //   purposeOfApplication == "abituryent"
        // ) {
        //   router.push("/profile/educational-information");
        // } else if (
        //   res?.data?.haveApplicationForm == true &&
        //   res?.data?.haveEducation == false &&
        //   purposeOfApplication == "transfer"
        // ) {
        //   router.push("/profile/transfer");
        // }

        // // else
        // else {
        //   router.push("/auth/create-account");
        // }

        // router.push("/profile/personal-information");
      })
      .catch((err) => {
        // console.log(err);
        // if error status code is 410 then show invalid code error
        if (err.response?.data?.statusCode === 410) {
          // inValidCodeError();
          setInvalidCode(true);
        } else {
          // serverError();
          setIsServerError(true);
        }
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const schema = yup.object().shape({
    phone: yup.string().required("Telefon raqamingizni kiriting"),
    code: yup
      .string()
      .required(t("common:auth.verificationCodeReq"))
      .matches(/^\d{6}$/, t("common:auth.verificationCodeValidation")),
  });

  const defaultValue = {
    phone: user_phone,
  };

  return (
    <Card className="w-[596px]  flex flex-col items-center bg-white rounded-[10px] px-5 py-7  mt-5  mx-auto">
      <Form
        defaultValues={defaultValue}
        className="w-full"
        schema={schema}
        onSubmit={onSubmit}
      >
        {" "}
        <Title
          title={t("auth.title")}
          text={
            <Trans
              i18nKey="common:auth.userPhoneVerification"
              components={{
                span: <span className="text-blue" />,
              }}
              values={{ number: user_phone }}
            />
          }
        />
        <span className="relative block">
          <Link
            href="/"
            className="absolute sm:-bottom-11 -bottom-8 right-0 text-blue text-sm"
          >
            <span className="mobile_340:block hidden">
              {t("common:auth.changePhoneNumber")}
            </span>
            <span className="mobile_340:hidden block">
              {t("common:auth.changeNumber")}
            </span>
          </Link>
        </span>
        <Fields
          invalidCode={invalidCode}
          setInvalidCode={setInvalidCode}
          setIsServerError={setIsServerError}
          isServerError={isServerError}
          loading={loading}
        />
        <div className="flex justify-center mt-5">
          {seconds != 0 ? (
            <p className="font-medium text-center">
              <Trans
                i18nKey="common:auth.resendCodeTime"
                components={{
                  span: <span className="text-blue" />,
                }}
                values={{ time: formatTime(seconds) }}
              />
            </p>
          ) : (
            <button onClick={ResendCode} className="text-blue font-medium">
              {t("auth.resendCode")}
            </button>
          )}
        </div>
      </Form>
    </Card>
  );
};
