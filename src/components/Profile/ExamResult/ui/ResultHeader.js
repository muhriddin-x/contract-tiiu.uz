import { formatDate } from "@/shared/lib/formatDate";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export const ResultHeader = ({ myApplication }) => {
  let { t } = useTranslation("common");
  if (!myApplication) return null;

  const application = myApplication;

  const statusMap = {
    pending: {
      className: "text-orange",
      text: t("allStatus.pending"),
    },
    "called-exam": {
      className: "text-violate",
      text: t("common:allStatus.called-exam"),
    },
    "came-exam": {
      className: "text-violate",
      text: t("common:allStatus.came-exam"),
    },
    accepted: {
      className: "text-emerald-green",
      text: t("common:allStatus.accepted"),
    },
    "edit-reject": {
      className: "text-carrot",
      text: t("common:allStatus.edit-reject"),
    },
    rejected: {
      className: "text-red ",
      text: t("allStatus.rejected"),
    },
    marked: {
      className: "text-sky-blue",
      text: t("common:allStatus.marked"),
    },
    contract: {
      className: "text-sky-blue",
      text: t("common:allStatus.marked"),
    },
    "recommended-student": {
      className: "text-nephritis",
      text: t("common:allStatus.recom-student"),
    },
  };

  const status = application?.status;
  const statusInfo = statusMap[status];

  return (
    <div className="sm:py-5 sm:px-5 py-2 px-3 rounded-lg flex justify-between bg-white">
      <div className="relative flex sm:gap-4 gap-2 items-start">
        <div className="flex items-start sm:gap-4 gap-2">
          <div>
            <Image
              src="/assets/application-status-user.png"
              width={44}
              height={44}
              alt="user"
            />
          </div>
          <div>
            <strong className="font-semibold sm:text-lg text-base">
              {/* {t("applicationStatus.applicationStatus")} */}
              {t("examResult.examResult")}{" "}
            </strong>
            <p
              className={`${
                statusInfo ? statusInfo.className : ""
              } sm:hidden top-0 sm:text-lg text-sm font-semibold text-start`}
            >
              {statusInfo ? statusInfo.text : null}
            </p>

            <p className="sm:text-sm text-sm text-btnGray text-nowrap">
              {/* {t("applicationStatus.submissionDate")}{" "} */}
              {t("examResult.examDate")}{" "}
              {formatDate(application?.exam?.exam_result?.when_finished || "")}
              {/* {formatDate(application?.created_at)} */}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-end justify-center">
        <p
          className={`${
            statusInfo ? statusInfo.className : ""
          }  text-lg font-semibold`}
        >
          {statusInfo ? statusInfo.text : null}
        </p>
        <p>{application?.status == "pending" && t("allStatus.pendingText")}</p>
      </div>
    </div>
  );
};
