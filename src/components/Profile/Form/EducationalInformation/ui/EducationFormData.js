import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { Form } from "@/shared/ui/HookForm";
import { educationalSchema } from "@/widgets/profile/config/educationalSchema";
import { EducationInfo } from "./fields/EducationsInfo";
import { Certificate } from "./fields/Certificate";
import { UZBM } from "./fields/UZBMB";
import { usePost, usePut } from "@/pages/api/https";
import uploadFile from "@/shared/lib/uploadFile/uploadFile";
import ResendApplicaiton from "@/widgets/modal/resendApplicaiton/ResendApplicaiton";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const getFileFields = (values) => [
  { file: values.diplom_certificate, usage: "diploma" },
  { file: values.certificate, usage: "certificate" },
  { file: values.uzbmb_file, usage: "dtm" },
];

const uploadFiles = async (fileFields, userEducationCertificate) => {
  const uploadableFiles = fileFields.filter(
    (item) => item.file instanceof Blob
  );

  const uploadedFiles = await Promise.all(
    uploadableFiles.map((item) =>
      uploadFile(item, userEducationCertificate?.[0]?.file)
    )
  );

  uploadedFiles.forEach((file, index) => {
    const field = fileFields.findIndex((item) => item.file instanceof Blob);
    if (field !== -1) fileFields[field] = file;
  });

  return fileFields;
};

const prepareUserEducation = (values, fileFields) => ({
  education_id: +values.education_id,
  region_id: +values.region_id,
  district_id: +values.district_id,
  institution_name: values.institution_name,
  institution_type: values.institution_type,
  file:
    typeof values.diplom_certificate !== "string"
      ? [fileFields[0]]
      : [values.diplom_certificate],
  src: "manually",
});

const handleNavigation = (
  router,
  {
    having_problem_with_education,
    having_problem_with_application,
    haveApplied,
  }
) => {
  if (having_problem_with_education && !having_problem_with_application) {
    setResendModal(true);
  } else if (!haveApplied) {
    router.push("/profile/select-direction");
  } else if (having_problem_with_application) {
    router.push("/profile/application-status/edit");
  } else {
    router.push("/profile/application-status");
  }
};

const handleCertificationsUpdate = async (
  values,
  fileFields,
  userEducationCertificate
) => {
  const latestCertification =
    userEducationCertificate?.[userEducationCertificate.length - 1];

  if (
    values.certificate?.size ||
    values.certification_type !== latestCertification?.certification_type
  ) {
    await usePost("/v1/certifications", {
      file: fileFields[1]?.file || fileFields[1],
      certification_type: values.certification_type,
      id: latestCertification?.id,
    });
  }
};

const handleDTMUpdate = async (uzbmb, fileFields) => {
  if (uzbmb.id) {
    await usePut(`/v1/application-forms/dtm/${uzbmb.id}`, {
      file: fileFields[2],
    });
  } else {
    await usePost("/v1/application-forms/dtm", { file: fileFields[2] });
  }
};

export const EducationFormData = ({ userData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [resendModal, setResendModal] = useState(false);
  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    defaultValues: {},
    resolver: yupResolver(educationalSchema(t)),
  });

  if (!userData) return null;

  const {
    user_education: userEducation,
    certifications: userEducationCertificate,
    haveApplied,
    having_problem_with_application,
    having_problem_with_education,
    dtm: uzbmb,
    is_master,
  } = userData;

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      let fileFields = getFileFields(values);
      fileFields = await uploadFiles(fileFields, userEducationCertificate);

      const user_education = prepareUserEducation(values, fileFields);
      await usePost("/v1/application-forms", { user_education });

      handleNavigation(router, {
        having_problem_with_education,
        having_problem_with_application,
        haveApplied,
      });
      await handleCertificationsUpdate(
        values,
        fileFields,
        userEducationCertificate
      );
      await handleDTMUpdate(uzbmb, fileFields);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      methods.reset({
        education_id: userEducation?.education_id,
        region_id: userEducation?.region_id,
        district_id: userEducation?.district_id,
        institution_name: userEducation?.institution_name,
        diplom_certificate: userEducation?.file?.[0] || undefined,
        certificate:
          userEducationCertificate?.[0]?.file ||
          userEducationCertificate?.[userEducationCertificate.length - 1]?.file,
        certification_type:
          userEducationCertificate?.[userEducationCertificate.length - 1]
            ?.certification_type,
        certification_toggle: userEducationCertificate?.[0]?.id ? "2" : "1",
        uzbmb_file: userData?.dtm?.file || undefined,
      });
    }
  }, [userData]);

  // const defaultValue = {
  //   education_id: userEducation?.education_id,
  //   region_id: userEducation?.region_id,
  //   district_id: userEducation?.district_id,
  //   institution_name: userEducation?.institution_name,
  //   diplom_certificate: userEducation?.file?.[0] || undefined,
  //   certificate:
  //     userEducationCertificate?.[0]?.file ||
  //     userEducationCertificate?.[userEducationCertificate.length - 1]?.file,
  //   certification_type:
  //     userEducationCertificate?.[userEducationCertificate.length - 1]
  //       ?.certification_type,
  //   uzbmb_file: userData?.dtm?.file || undefined,
  // };

  const handleClose = () => setResendModal(false);

  const bakalavr = purposeOfApplication == "abituryent" || is_master == false;

  return (
    <section className="pb-5">
      <Form schema={educationalSchema(t)} methods={methods} onSubmit={onSubmit}>
        <EducationInfo />
        {bakalavr && <UZBM defaultToggle={uzbmb?.id} />}
        <Certificate
          isLoading={isLoading}
          defaultToggle={userEducationCertificate?.[0]?.id}
          userData={userData}
        />
        <ResendApplicaiton
          open={resendModal}
          onClose={handleClose}
          setResendModal={setResendModal}
        />
      </Form>
    </section>
  );
};
