import { ProfileTitle as Title } from "@/widgets/title";
import { Form } from "@/shared/ui/HookForm";
import { directionSelectSchema } from "@/widgets/profile/config/directionSelect";
import { useEffect, useState } from "react";
import { useGet, usePost } from "@/pages/api/https";
import { useGetMyDataQuery } from "@/entities/user";
import { Fields } from "./Fields";
import toast, { Toaster } from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";
import uploadFile from "@/shared/lib/uploadFile/uploadFile";
import { useRouter } from "next/router";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";

export const SelectDirectionFormData = () => {
  let { t } = useTranslation("common");
  const router = useRouter();
  const notifyErrorConflict = () =>
    toast.error(t("responceError.alreadyApplied"));

  const notifyErrorServer = () => {
    toast.error(t("responceError.serverError"));
  };
  const [isWorkExperience, setWorkExperience] = useState(null);

  const [applyModal, setApplyModal] = useState(false);
  const [application, setApplication] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState([]);
  const [isHaveApplication, setIsHaveApplication] = useState(false);
  const [removeBtn, setRemoveBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");

  const { data: userData } = useGetMyDataQuery();

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
    setIsLoading(true);
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
        uploadableFiles.map((item) => uploadFile(item))
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
      usePost("/v1/applicants", {
        degree_id: values?.degree_id
          ? +values.degree_id
          : purposeOfApplication == "abituryent"
          ? 1
          : purposeOfApplication == "master"
          ? 2
          : 1,
        direction_id: +values.direction_id,
        education_type_id: +values.education_type_id,
        education_language_id: +values.education_language_id,
        work_experience_document: fileFields[0],
        is_master:
          purposeOfApplication == "abituryent"
            ? false
            : purposeOfApplication == "master"
            ? true
            : false,

        is_transfer_student:
          userData?.user_previous_education !== null ? true : false,
      })
        .then((res) => {
          setSelectedDirection(res?.data?.direction_name);
          router.push("/profile/application-status").then(() => {
            router.reload();
          });
          // setApplyModal(true);
          setRemoveBtn(true);
        })
        .catch((err) => {
          if (err?.response?.data?.statusCode === 409) {
            notifyErrorConflict();
          } else {
            notifyErrorServer();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {}
  };
  const handleClose = () => {
    setApplyModal(false);
  };

  if (!application?.degree_id && !userData?.phone) return null;

  const defaultValue = {
    degree_id: application?.degree_id,
    direction_id: application?.direction_id,
    education_type_id: application?.education_type_id,
    education_language_id: application.education_language_id,
    work_experience_document: application?.work_experience_document
      ? application?.work_experience_document
      : undefined,
  };
  const degreeID =
    purposeOfApplication === "abituryent"
      ? 1
      : purposeOfApplication === "master"
      ? 2
      : purposeOfApplication == "transfer"
      ? 3
      : 1;
  return (
    <section className="rounded-lg p-6 bg-white mt-5">
      <Title title={t("selectDirection.selectDirection")} />
      <Form
        defaultValues={defaultValue}
        schema={directionSelectSchema(t, isWorkExperience, degreeID)}
        className="mt-5"
        onSubmit={onSubmit}
      >
        <Fields
          application={application}
          isOpen={applyModal}
          onClose={handleClose}
          isHaveApplication={isHaveApplication}
          selectedDirection={selectedDirection}
          removeBtn={removeBtn}
          setWorkExperience={setWorkExperience}
          isLoading={isLoading}
          degreeID={degreeID}
        />
      </Form>
      <Toaster position="top-right" />
    </section>
  );
};
