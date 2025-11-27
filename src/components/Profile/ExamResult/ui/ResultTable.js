import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

// import { totalResultBySubject } from "@/shared/lib/totalResultBySubject";

export const ResultTable = ({ myApplication, getConfig }) => {
  let { t, lang } = useTranslation("common");
  if (!myApplication) return null;

  const examResult = myApplication?.exam?.exam_result[0];
  const firstSubject = examResult?.first_subject_name;
  const secondSubject = examResult?.second_subject_name;
  const thridSubject = examResult?.third_subject_name;
  const totalMarks = Math.round(examResult?.total_mark * 100) / 100;
  return (
    <div className="sm:py-5 sm:px-5 py-2 px-4 rounded-lg flex justify-between bg-white mt-5">
      <div className="w-full">
        <h2 className="sm:text-lg text-base font-semibold">
          {t("examResult.examSubjects")}
        </h2>

        <table className="mt-4 w-full">
          <thead className="bg-main-gray rounded-t-lg p-2 block text-xs">
            <tr className="grid sm:grid-cols-9 grid-cols-7  items-center w-full ">
              <th className="uppercase font-semibold sm:col-span-3  col-span-3  text-start">
                {t("examResult.examSubjectName")}{" "}
              </th>
              {/* <th className="uppercase font-semibold col-span-3  text-start">
                {t("examResult.everySubject")}{" "}
              </th> */}
              <th className="uppercase font-semibold sm:col-span-3 col-span-2  text-start">
                {t("examResult.correctAnswer")}{" "}
              </th>
              <th className="uppercase font-semibold sm:col-span-3 col-span-2  text-start">
                {t("examResult.overallScoreBySubject")}{" "}
              </th>
            </tr>
          </thead>
          <tbody className="block border-y-2 border-mix-blue  font-medium text-sm px-2">
            {firstSubject && (
              <tr className="w-full grid sm:grid-cols-9 grid-cols-7  border-b-2 border-mix-blue py-4 ">
                <td className="sm:col-span-3 col-span-3  text-start ">
                  {firstSubject?.[`name_${lang}`]}
                </td>
                {/* <td className="col-span-3  text-start ">
                  7.1 ball
                </td> */}
                <td className="sm:col-span-3 col-span-2  text-start ">
                  {examResult?.first_subject_score} / 20
                </td>
                <td className="sm:col-span-3 col-span-2  text-start ">
                  {examResult?.first_subject_mark}
                  {/* {totalResultBySubject(
                    examResult?.first_subject_score,
                    "first_subject_score"
                  )}{" "} */}{" "}
                  ball
                </td>{" "}
              </tr>
            )}
            <tr className="grid sm:grid-cols-9 grid-cols-7  border-b-2 border-mix-blue py-4 ">
              <td className="sm:col-span-3 col-span-3  text-start">
                {secondSubject?.[`name_${lang}`]}
              </td>
              {/* <td className="col-span-3  text-start ">6.1 ball</td> */}
              <td className="sm:col-span-3 col-span-2  text-start ">
                {examResult?.second_subject_score} / 20
              </td>
              <td className="sm:col-span-3 col-span-2  text-start ">
                {examResult?.second_subject_mark}
                {/* {totalResultBySubject(
                  examResult?.second_subject_score,
                  "second_subject_score"
                )}{" "} */}{" "}
                ball
              </td>
            </tr>
            <tr className="w-full grid sm:grid-cols-9 grid-cols-7   py-4 ">
              <td className="sm:col-span-3 col-span-3  text-start">
                {" "}
                {thridSubject?.[`name_${lang}`]}
              </td>
              <td className="sm:col-span-3 col-span-2  text-start ">
                {examResult?.third_subject_score} / 20
              </td>
              <td className="sm:col-span-3 col-span-2  text-start ">
                {examResult?.third_subject_mark}
                ball
              </td>
            </tr>
          </tbody>
        </table>

        <strong className="text-center block sm:text-3xl text-xl sm:mt-10 mt-5">
          {" "}
          {totalMarks} ball
          {/* {Math.round(examResult?.total_mark * 100) / 100} ball */}
        </strong>
        <strong className="text-center block sm:text-xl text-base mt-1 sm:mt-2">
          {" "}
          {t("examResult.examResult")}{" "}
        </strong>
        {/* {totalMarks >= 56.6
          ? SucccessfullyPassed({ t, myApplication, getConfig })
          : FaildPassed({ t })} */}
        {FaildPassed({ t })}
      </div>
    </div>
  );
};

function FaildPassed({ t }) {
  return (
    <div className="bg-main-gray text-center p-5 rounded-2xl mt-5">
      <p className="sm:text-lg text-base font-bold">
        {t("examResult.contactSoon")}{" "}
      </p>
      <p className="sm:text-base text-sm font-medium mt-2 text-blue">
        {t("examResult.callCenter")}{" "}
        <a href="tel:+998781131717">+99878 113 17 17</a>
      </p>
    </div>
  );
}

function SucccessfullyPassed({ t, myApplication, getConfig }) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <div className="text-center p-5 rounded-2xl mt-0">
      <p className="sm:text-lg text-base font-bold text-primary">
        Tabriklaymiz siz o'qishga qabul qilindingiz
      </p>
      <a
        target="_blank"
        href={
          publicRuntimeConfig.backendUrl +
          "/v1/files/download/" +
          myApplication?.contract_id
        }
        // src={`${publicRuntimeConfig.backendUrl}/${userData?.photo}`}

        download
        className="w-full flex justify-center items-center gap-2 py-3 mt-5 rounded-lg bg-secondary text-white text-center"
      >
        <p>Shartnomani yuklab olish</p>
        <Image
          src="/assets/arrow-down.svg"
          className="-rotate-90"
          width={20}
          height={20}
          alt="arrow-down"
        />{" "}
      </a>
    </div>
  );
}
