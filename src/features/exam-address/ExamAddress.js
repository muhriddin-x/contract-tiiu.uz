import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import Image from "next/image";
import Link from "next/link";

export const ExamAddress = ({
  exam,
  examAddress,
  exam_type,
  online_exam_link,
  take_exam_anytime,
  t,
}) => {
  const token = getLocalStorageItem("token");
  const universiyTest = "https://exam.tiiu.uz/test-start?";
  // const localTest = "http://localhost:3001/test-start?";
  return (
    <div className="grid grid-cols-4 gap-y-4">
      {!take_exam_anytime && (
        <div className="col-span-2">
          <p className="sm:text-lg font-semibold">Imtihon kuni</p>
          <p className="text-sm text-btnGray">{exam?.exam_date}</p>
        </div>
      )}
      {!take_exam_anytime && (
        <div className="col-span-2">
          <p className="sm:text-lg font-semibold">Imtihon vaqti</p>
          <p className="text-sm text-btnGray">{exam?.exam_time}</p>
        </div>
      )}
      <div className="sm:col-span-4 col-span-4">
        <p className="sm:text-lg font-semibold">Imtihon uchun havola</p>
        {ExamLink(
          universiyTest,
          token,
          exam_type,
          online_exam_link,
          examAddress,
          t
        )}
      </div>
    </div>
  );
};

function ExamLink(
  universiyTest,
  token,
  exam_type,
  online_exam_link,
  examAddress,
  t
) {
  if (exam_type == "online") {
    if (online_exam_link?.startsWith("https://exam.tiiu.uz")) {
      return (
        <Link
          target="_blank"
          className=" bg-primary text-white font-medium flex justify-center items-center sm:p-3 p-3 w-full mt-2 rounded-lg"
          href={universiyTest + token}
        >
          {t("applicationStatus.onlineExam")}
        </Link>
      );
    } else {
      return (
        <Link
          target="_blank"
          className=" bg-primary text-white font-medium flex justify-center items-center sm:p-3 p-3 w-full mt-2 rounded-lg"
          href={online_exam_link}
        >
          <p>{t("applicationStatus.onlineExam")}</p>
          <Image
            src="/assets/arrow-down.svg"
            className="-rotate-90"
            width={20}
            height={20}
            alt="arrow-down"
          />{" "}
        </Link>
      );
    }
  } else {
    return examAddress;
  }
}
