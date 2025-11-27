import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Modal } from "@/shared/ui/Modal";
import Link from "next/link";
import Trans from "next-translate/Trans";
import { useRouter } from "next/router";

const SuccessfullyApply = ({ src, userName, directionName, onClose, open }) => {
  let { t } = useTranslation("common");
  const router = useRouter();
  const routeApplicationPage = () => {
    router.push("/profile/application-status").then(() => {
      router.reload();
    });
  };
  return (
    <Modal
      opened={open}
      onClose={onClose}
      width={600}
      contentClassName="relative rounded-lg"
    >
      <div className="p-5  font-montserrat">
        <div className="flex flex-col justify-center items-center mt-5">
          <Image
            src="/assets/univer-logo.png"
            width={130}
            height={96}
            alt="diplom"
          />
          <p className="mt-5 text-[20px] font-bold text-center">
            <Trans
              i18nKey="common:successModal.userAndDirectionName"
              components={{
                span: <span className="text-primary" />,
              }}
              values={{ user: userName, direction: directionName }}
            />
          </p>
        </div>
        <div className="flex items-center justify-center xl:flex-none flex-wrap gap-5 mt-5 pb-4 font-medium">
          <Link
            href="https://tiiu.uz/"
            className="px-7 py-3 rounded-lg border border-secondary text-secondary sm:w-auto w-full text-center"
          >
            {t("successModal.backToMainPage")}
          </Link>
          <button
            onClick={routeApplicationPage}
            className="px-7 py-3 rounded-lg border bg-secondary text-white sm:w-auto w-full text-center"
          >
            {t("successModal.backToApplicationPage")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessfullyApply;
