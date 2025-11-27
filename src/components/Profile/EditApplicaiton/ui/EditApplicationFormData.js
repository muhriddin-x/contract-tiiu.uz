import { ProfileTitle as Title } from "@/widgets/title";
import { Form } from "@/shared/ui/HookForm";
import { directionSelectSchema } from "@/widgets/profile/config/directionSelect";
import { useEffect, useState } from "react";
import { useGet, usePatch } from "@/pages/api/https";
import { Fields } from "./Fields";
import toast, { Toaster } from "react-hot-toast";
import uploadFile from "@/shared/lib/uploadFile/uploadFile";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useGetMyDataQuery } from "@/entities/user";
// import { useGetMyApplicationQuery } from "@/entities/myApplication";

export const EditApplicationFormData = () => {
  let { t } = useTranslation("common");
  const router = useRouter();

  const notifyErrorConflict = () =>
    toast.error(t("responceError.alreadyApplied"));

  const notifyErrorServer = () => {
    toast.error(t("responceError.serverError"));
  };
  const { data: userData } = useGetMyDataQuery();
  const is_transfer_student = userData?.is_transfer_student;
  const is_second_specialty = userData?.is_second_specialty;

  const [isWorkExperience, setWorkExperience] = useState(null);

  const [applyModal, setApplyModal] = useState(false);
  const [application, setApplication] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState([]);
  const [isHaveApplication, setIsHaveApplication] = useState(false);

  useEffect(() => {
    useGet("/v1/applicants/my-application")
      .then((res) => {
        setApplication(res?.data);
        setWorkExperience(res?.data?.work_experience_document?.length > 0);
        if (res?.data.length > 0) {
          setIsHaveApplication(true);
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  const onSubmit = async (values) => {
    const fileFields = [
      {
        file: values.work_experience_document,
        usage: "work_experience",
      },
    ];

    const uploadableFiles = fileFields.filter(
      (item) => item.file instanceof Blob
    );
    try {
      const uploadedFiles = await Promise.all(
        uploadableFiles.map((item) =>
          uploadFile(item, application?.work_experience_document)
        )
      );

      fileFields.reduce((lastBlobIndex, item, index) => {
        if (item.file instanceof Blob) {
          fileFields[index] = uploadedFiles[lastBlobIndex];
          return ++lastBlobIndex;
        } else {
          fileFields[index] = fileFields[index].file;
        }
        return lastBlobIndex;
      }, 0);
      // usePatch(`/v1/applicants/${application?.applicant_id}`, {
      usePatch(`/v1/applicants`, {
        degree_id: +values.degree_id,
        direction_id: +values.direction_id,
        education_type_id: +values.education_type_id,
        education_language_id: +values.education_language_id,
        work_experience_document: isWorkExperience ? fileFields[0] : null,
      })
        .then((res) => {
          setSelectedDirection(res?.data?.direction_name);
          router.push("/profile/application-status").then(() => {
            router.reload();
          });
          // setApplyModal(true);
        })
        .catch((err) => {
          if (err?.response?.data?.statusCode === 409) {
            notifyErrorConflict();
          } else {
            notifyErrorServer();
          }
        })
        .finally(() => {});
    } catch (e) {}
  };
  const handleClose = () => {
    setApplyModal(false);
  };

  if (!application?.degree_id) return null;

  const defaultValue = {
    degree_id: application?.degree_id,
    direction_id: application?.direction_id,
    education_type_id: application?.education_type_id,
    education_language_id: application.education_language_id,
    work_experience_document: application?.work_experience_document
      ? application?.work_experience_document
      : undefined,
  };

  return (
    <section className="rounded-lg p-6 bg-white ">
      <Title title={t("applicationStatus.applicationEdit")} />
      <Form
        defaultValues={defaultValue}
        schema={directionSelectSchema(t, isWorkExperience)}
        className="mt-5"
        onSubmit={onSubmit}
      >
        <Fields
          router={router}
          application={application}
          isOpen={applyModal}
          onClose={handleClose}
          isHaveApplication={isHaveApplication}
          selectedDirection={selectedDirection}
          setWorkExperience={setWorkExperience}
          is_transfer_student={is_transfer_student}
          is_second_specialty={is_second_specialty}
        />
      </Form>
      <Toaster position="top-right" />
    </section>
  );
};
