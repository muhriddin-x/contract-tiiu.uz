import { ExamAddress } from "@/features/exam-address";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";

export const Applicaiton = ({ myApplication, router }) => {
  let { t, lang } = useTranslation("common");
  if (!myApplication) return null;
  const application = myApplication;
  const token = getLocalStorageItem("token");
  const universiyTest = "https://exam.tiiu.uz/test-start?";
  const localTest = "http://localhost:3001/test-start?";
  const { publicRuntimeConfig } = getConfig();

  const {
    having_problem_with_application,
    having_problem_with_education,
    having_problem_with_profile,
  } = application;

  function redirectURL() {
    if (having_problem_with_profile) {
      router.push("/profile/personal-information");
    } else if (having_problem_with_education) {
      router.push("/profile/educational-information");
    } else if (having_problem_with_application) {
      router.push("/profile/application-status/edit");
    }
  }

  return (
    <div className="p-5 bg-white rounded-lg mt-5 grid grid-cols-4">
      <h1 className="text-[20px] font-semibold col-span-4">
        {t("applicationStatus.myApplication")}
      </h1>
      <div className="xl:col-span-2 col-span-4 mt-5">
        <p className="sm:text-lg font-semibold">
          {application?.[`degree_name_${lang}`]}
        </p>
        <p className="text-sm text-btnGray">{t("applicationStatus.degree")}</p>
      </div>
      <div className="xl:col-span-2 col-span-4 mt-5">
        <p className="sm:text-lg font-semibold">
          {application?.[`direction_name_${lang}`]}
        </p>
        <p className="text-sm text-btnGray">
          {t("applicationStatus.direction")}
        </p>
      </div>
      <div className="xl:col-span-2 col-span-4 mt-5">
        <p className="sm:text-lg font-semibold">
          {application?.[`education_type_name_${lang}`]}
        </p>
        <p className="text-sm text-btnGray">
          {t("applicationStatus.educationType")}
        </p>
      </div>
      <div className="xl:col-span-2 col-span-4 mt-5  ">
        <div>
          <p className="sm:text-lg font-semibold">
            {application?.[`education_language_name_${lang}`]}
          </p>
          <p className="text-sm text-btnGray">
            {t("applicationStatus.educationLang")}
          </p>
        </div>
      </div>
      <div className="xl:col-span-2 col-span-4 mt-5  ">
        {application?.work_experience_document && (
          <div>
            <a
              target="_blank"
              className="text-blue underline"
              href={`${publicRuntimeConfig.backendUrl}/${application.work_experience_document}`}
            >
              Ish-tajribasi.png
            </a>
            <p className="text-sm text-btnGray">
              {t("applicationStatus.workExperience")}
            </p>
          </div>
        )}
      </div>
      {application?.status == "pending" && (
        <Link
          href="/profile/application-status/edit"
          className="col-span-4 flex justify-center items-center gap-2 py-3 mt-10 rounded-lg bg-secondary text-white text-center"
        >
          <Image
            src="/assets/edit-application.svg"
            width={20}
            height={20}
            alt="edit"
          />{" "}
          <p>{t("applicationStatus.applicationEdit")}</p>
        </Link>
      )}
      {application?.status == "called-exam" && (
        <div className="col-span-4">
          <ExamAddress
            exam={application?.exam}
            examAddress={application.exam.exam_address}
            exam_type={application.exam.exam_type}
            online_exam_link={application.exam.online_exam_link}
            take_exam_anytime={application.exam.take_exam_anytime}
            t={t}
          />
        </div>
      )}

      {application?.status == "edit-reject" && (
        <button
          onClick={redirectURL}
          className="col-span-4 flex justify-center items-center gap-2 py-3 mt-10 rounded-lg bg-secondary text-white text-center"
        >
          <Image
            src="/assets/edit-application.svg"
            width={20}
            height={20}
            alt="edit"
          />{" "}
          <p>{t("applicationStatus.applicationEdit")}</p>
        </button>
      )}
      {application?.status == "contract" && (
        <div className="col-span-4 text-start flex justify-start ">
          <a
            target="_blank"
            href={
              application?.contract_file_link ||
              publicRuntimeConfig.backendUrl +
                "/v1/files/download/" +
                application?.contract_id
            }
            download
            className="flex justify-center items-center gap-2 py-3 rounded-lg  text-primary underline border-primary text-center"
          >
            {ContractIcon()}
            <p>Shartnomani yuklab olish</p>
          </a>
        </div>
      )}
      {/* 
      <button className="col-span-4 py-3 mt-5 rounded-lg border bg-white text-secondary text-center">
        Arizani bekor qilish
      </button> */}
    </div>
  );
};
function ContractIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.75C11.22 22.75 10.46 22.35 9.94 21.65L8.93 20.3C8.72 20.02 8.44 19.86 8.14 19.84C7.84 19.83 7.54 19.96 7.3 20.21L6.73 19.7L7.28 20.21C5.84 21.75 4.73 21.63 4.2 21.42C3.66 21.21 2.75 20.52 2.75 18.3V7.04C2.75 2.6 4.03 1.25 8.22 1.25H15.78C19.97 1.25 21.25 2.6 21.25 7.04V18.3C21.25 20.51 20.34 21.2 19.8 21.42C19.27 21.63 18.17 21.75 16.72 20.21C16.48 19.95 16.19 19.81 15.87 19.84C15.57 19.86 15.28 20.02 15.07 20.3L14.06 21.65C13.54 22.35 12.78 22.75 12 22.75ZM8.08 18.33C8.12 18.33 8.17 18.33 8.21 18.33C8.95 18.37 9.65 18.76 10.12 19.39L11.13 20.74C11.62 21.39 12.37 21.39 12.86 20.74L13.87 19.39C14.35 18.76 15.04 18.37 15.79 18.33C16.53 18.29 17.27 18.6 17.81 19.18C18.57 19.99 19.07 20.09 19.24 20.02C19.48 19.92 19.74 19.34 19.74 18.3V7.04C19.74 3.43 19.11 2.75 15.77 2.75H8.22C4.88 2.75 4.25 3.43 4.25 7.04V18.3C4.25 19.35 4.51 19.93 4.75 20.02C4.92 20.09 5.42 19.99 6.18 19.18C6.72 18.63 7.39 18.33 8.08 18.33Z"
        fill="currentColor"
      />
      <path
        d="M16 7.75H8C7.59 7.75 7.25 7.41 7.25 7C7.25 6.59 7.59 6.25 8 6.25H16C16.41 6.25 16.75 6.59 16.75 7C16.75 7.41 16.41 7.75 16 7.75Z"
        fill="currentColor"
      />
      <path
        d="M15 11.75H9C8.59 11.75 8.25 11.41 8.25 11C8.25 10.59 8.59 10.25 9 10.25H15C15.41 10.25 15.75 10.59 15.75 11C15.75 11.41 15.41 11.75 15 11.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
