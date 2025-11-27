import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { Modal } from "@/shared/ui/Modal";
import Trans from "next-translate/Trans";
import { useGetMyApplicationQuery } from "@/entities/myApplication";
import { usePatch } from "@/pages/api/https";
import { useRouter } from "next/router";

const ResendApplicaiton = ({ setResendModal, onClose, open }) => {
  let { t } = useTranslation("common");
  const { data: myApplication } = useGetMyApplicationQuery();
  const router = useRouter();
  const editApplication = () => {
    usePatch(`/v1/applicants`, {
      degree_id: myApplication?.degree_id,
      direction_id: myApplication?.direction_id,
      education_type_id: myApplication?.education_type_id,
      education_language_id: myApplication.education_language_id,
      work_experience_document: myApplication?.work_experience_document
        ? myApplication?.work_experience_document
        : undefined,
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        router.push("/profile/application-status").then(() => {
          // Set the resendModal state to false
          setResendModal(false);
          // Reload the page
          router.reload();
        });
        // setResendModal(false);
        // router.push("/profile/application-status");
        // router.reload();
      });
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      width={500}
      contentClassName="relative rounded-lg"
    >
      <div className="p-5  font-montserrat">
        <div className="flex justify-center items-center mt-5 bg-primary w-20 h-20 rounded-full mx-auto bg-opacity-10 p-2">
          <Image
            src={"/assets/resendApplication.svg"}
            width={48}
            height={96}
            alt="diplom"
          />
        </div>

        <p className="text-center mt-5 font-medium ">
          If you are sure that the information you entered is correct, click the
          <span className="text-primary"> "Resend applicaiton"</span> button, or
          go back and edit the information again.{" "}
        </p>
        <div className="flex items-center justify-center xl:flex-none flex-wrap sm:flex-row flex-col-reverse gap-5 mt-5 pb-4 font-medium">
          {/* <button
            onClick={handleBackButtonClick}
            className="sm:max-w-[200px] py-3 rounded-lg border border-secondary text-secondary  w-full text-center"
          >
            Back
          </button> */}
          <button
            onClick={editApplication}
            className="sm:max-w-[180px] py-3 rounded-lg border bg-secondary text-white text-sm w-full text-center"
          >
            Resend applicaiton
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResendApplicaiton;
