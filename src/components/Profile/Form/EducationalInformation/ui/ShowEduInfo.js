import { formatMoney } from "@/shared/lib/formatMoney";
import InfoRow from "@/shared/ui/InfoRow/InfoRow";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import Link from "next/link";
import { Fragment } from "react";

export const ShowEduInfo = ({ userData }) => {
  let { t, lang } = useTranslation("common");
  const { publicRuntimeConfig } = getConfig();

  return (
    <Fragment>
      <section className="rounded-lg p-6 bg-white mt-5">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-y-5 mt-4">
          <InfoRow label="Daraja" value={userData?.[`degree_name_${lang}`]} />
          <InfoRow
            label="️Yo'nalish nomi"
            value={userData?.[`direction_name_${lang}`]}
          />
          <InfoRow
            label="Ta'lim turi"
            value={userData?.[`education_type_name_${lang}`]}
          />
          <InfoRow
            label="Ta’lim tili"
            value={userData?.[`education_language_name_${lang}`]}
          />
          <InfoRow
            label="O'qish to'lovi"
            value={`${formatMoney(userData.tuition_fee)} UZS`}
          />
          {userData?.work_experience_document && (
            <div className="col-span-2">
              <p className="text-sm text-btnGray">
                {t("applicationStatus.workExperience")}
              </p>
              <a
                target="_blank"
                className="text-blue underline"
                href={`${publicRuntimeConfig.backendUrl}/${userData.work_experience_document}`}
              >
                {userData.work_experience_document?.split("/").pop()}
              </a>
            </div>
          )}
        </div>
      </section>
      <Link
        href="/profile/payment-history"
        className="mt-5 w-full bg-secondary text-white py-3 sm:rounded-lg block text-center sm:mb-0 mb-5"
      >
        Keyingi sahifa
      </Link>
    </Fragment>
  );
};
