import { formatDate } from "@/shared/lib/formatDate";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export const Status = ({ myApplication }) => {
  let { t } = useTranslation("common");
  if (!myApplication) return null;

  const application = myApplication;
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
              {t("applicationStatus.applicationStatus")}
            </strong>
            <p
              className={`${
                application?.status == "pending"
                  ? " text-[#FFA500] bg-opacity-10"
                  : application?.status == "called-exam" ||
                    application?.status == "came-exam"
                  ? " text-[#6D28D9] bg-opacity-10"
                  : application?.status == "accepted"
                  ? " text-[#27AE60] bg-opacity-10"
                  : application?.status == "edit-reject"
                  ? " text-[#FF6B35] bg-opacity-10"
                  : application?.status == "rejected"
                  ? " text-[#F42C2C] bg-opacity-10"
                  : application?.status == "marked" ||
                    application?.status == "contract"
                  ? " text-[#1AA4FF] bg-opacity-10"
                  : application?.status == "recommended-student"
                  ? " text-[#27AE60] bg-opacity-10"
                  : null
              }  sm:hidden top-0  sm:text-lg text-base font-semibold text-start`}
            >
              {application?.status == "pending"
                ? t("allStatus.pending")
                : application?.status == "accepted"
                ? t("allStatus.accepted")
                : application?.status == "called-exam"
                ? t("allStatus.called-exam")
                : application?.status == "edit-reject"
                ? t("allStatus.edit-reject")
                : application?.status == "rejected"
                ? t("allStatus.rejected")
                : application?.status == "marked" ||
                  application?.status == "contract"
                ? t("allStatus.marked")
                : application?.status == "came-exam"
                ? t("allStatus.came-exam")
                : application?.status == "recommended-student"
                ? t("allStatus.recom-student")
                : null}
            </p>
            <p className="sm:text-sm text-sm text-btnGray text-nowrap">
              {t("applicationStatus.submissionDate")}{" "}
              {formatDate(application?.created_at)}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-end justify-center">
        <strong
          className={`${
            application?.status == "pending"
              ? "text-[#FFA500] bg-opacity-10"
              : application?.status == "called-exam" ||
                application?.status == "came-exam"
              ? " text-[#6D28D9] bg-opacity-10"
              : application?.status == "accepted"
              ? " text-[#27AE60] bg-opacity-10"
              : application?.status == "edit-reject"
              ? " text-[#FF6B35] bg-opacity-10"
              : application?.status == "rejected"
              ? " text-[#F42C2C] bg-opacity-10"
              : application?.status == "marked" ||
                application?.status == "contract"
              ? " text-[#1AA4FF] bg-opacity-10"
              : application?.status == "recommended-student"
              ? " text-[#27AE60] bg-opacity-10"
              : null
          }  text-lg font-semibold`}
        >
          {application?.status == "pending"
            ? t("allStatus.pending")
            : application?.status == "accepted"
            ? t("allStatus.accepted")
            : application?.status == "called-exam"
            ? t("allStatus.called-exam")
            : application?.status == "edit-reject"
            ? t("allStatus.edit-reject")
            : application?.status == "rejected"
            ? t("allStatus.rejected")
            : application?.status == "marked" ||
              application?.status == "contract"
            ? t("allStatus.marked")
            : application?.status == "came-exam"
            ? t("allStatus.came-exam")
            : application?.status == "recommended-student"
            ? t("allStatus.recom-student")
            : null}
        </strong>
        <p>{application?.status == "pending" && t("allStatus.pendingText")}</p>
      </div>
    </div>
  );
};
