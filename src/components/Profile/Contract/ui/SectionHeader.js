import { formatDate } from "@/shared/lib/formatDate";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export const SectionHeader = ({ myApplication }) => {
  let { t } = useTranslation("common");

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
              {/* {t("applicationStatus.applicationStatus")} */}
              Shartnoma
            </strong>

            <p className="sm:text-sm text-sm text-btnGray text-nowrap">
              Shartnoma yaratilgan sana: 10.05.2023 12:45
              {/* {t("applicationStatus.submissionDate")}{" "} */}
              {/* {formatDate(application?.created_at)} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
