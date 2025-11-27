import { Form } from "@/shared/ui/HookForm";
import { PinflEducationInfo } from "./fields/PinflEducationInfo";
import useTranslation from "next-translate/useTranslation";
import { educationalPinflSchema } from "@/widgets/profile/config/educationalPinflSchema";
import { usePost, usePut } from "@/pages/api/https";
import { Certificate } from "./fields/Certificate";
import { useRouter } from "next/router";
import uploadFile from "@/shared/lib/uploadFile/uploadFile";
import ResendApplicaiton from "@/widgets/modal/resendApplicaiton/ResendApplicaiton";
import { useEffect, useState } from "react";
import { UZBM } from "./fields/UZBMB";
import { getLocalStorageItem } from "@/shared/lib/getLocalStorageItem";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const PinflEducationFormData = ({ userPinflData, userData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [resendModal, setResendModal] = useState(false);
  const purposeOfApplication = getLocalStorageItem("purposeOfApplication");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    defaultValues: {},
    resolver: yupResolver(educationalPinflSchema(t)),
  });

  if (!userData) return null;

  const {
    pinfl_user_education: isQueryUserPinflData,
    certifications: isQueryUserPinflDataCertificate,
    dtm: isQueryUserPinflDataUzbmb,
    haveApplied,
    having_problem_with_application,
    having_problem_with_education,
    is_master,
  } = userData;

  const certificationToggle = isQueryUserPinflDataCertificate?.[0]?.id
    ? "2"
    : "1";
  const uzbmb = isQueryUserPinflDataUzbmb;

  const onSubmit = async (values) => {
    setIsLoading(true);
    const fileFields = [
      { file: values.certificate, usage: "certificate" },
      { file: values.uzbmb_file, usage: "dtm" },
    ];

    const uploadableFiles = fileFields.filter(
      (item) => item.file instanceof Blob
    );

    try {
      const uploadedFiles = await Promise.all(
        uploadableFiles.map((item) =>
          uploadFile(item, isQueryUserPinflDataCertificate?.[0]?.file)
        )
      );

      fileFields.forEach((item, index) => {
        if (item.file instanceof Blob) {
          fileFields[index] = uploadedFiles.shift();
        }
      });

      const pinfl_user_education = {
        institution_type:
          userPinflData?.institution_type ||
          isQueryUserPinflData?.institution_type,
        region: userPinflData?.region || isQueryUserPinflData?.region,
        district: userPinflData?.district || isQueryUserPinflData?.district,
        institution_name:
          userPinflData?.institution_name ||
          isQueryUserPinflData?.institution_name,
        document: userPinflData?.document || isQueryUserPinflData?.document,
        file: [],
        src: "automatic",
      };

      await usePost("/v1/application-forms", { pinfl_user_education });

      if (having_problem_with_education && !having_problem_with_application) {
        setResendModal(true);
      } else if (!haveApplied) {
        router.push("/profile/select-direction");
      } else if (having_problem_with_application) {
        router.push("/profile/application-status/edit");
      } else {
        router.push("/profile/application-status");
      }

      if (
        values.certificate?.size ||
        values.certification_type !==
          isQueryUserPinflDataCertificate?.[
            isQueryUserPinflDataCertificate.length - 1
          ]?.certification_type
      ) {
        await usePost("/v1/certifications", {
          file: fileFields[0]?.file || fileFields[0],
          certification_type: values.certification_type,
          id: userData.certifications[userData.certifications.length - 1]?.id,
        });
      }

      if (uzbmb.id) {
        await usePut(`/v1/application-forms/dtm/${uzbmb.id}`, {
          file: fileFields[1],
        });
      } else {
        await usePost(`/v1/application-forms/dtm`, { file: fileFields[1] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const defaultValues = {
  //   institution_type:
  //     userPinflData?.institution_type === "school"
  //       ? "Maktab"
  //       : userPinflData?.institution_type,
  //   region: userPinflData?.region,
  //   district_id: userPinflData?.district,
  //   institution_name: userPinflData?.institution_name,
  //   document: userPinflData?.document,
  //   certificate:
  //     userData?.certifications?.[0]?.file ??
  //     userData?.certifications?.[userData?.certifications?.length - 1]?.file,
  //   certification_type:
  //     userData?.certifications?.[userData?.certifications?.length - 1]
  //       ?.certification_type,
  //   uzbmb_file: userData?.dtm?.file ? userData?.dtm?.file : undefined,
  // };

  // const queryDefaultValues = {
  //   institution_type:
  //     isQueryUserPinflData?.institution_type === "school"
  //       ? "Maktab"
  //       : isQueryUserPinflData?.institution_type,
  //   region: isQueryUserPinflData?.region,
  //   district_id: isQueryUserPinflData?.district,
  //   institution_name: isQueryUserPinflData?.institution_name,
  //   document: isQueryUserPinflData?.document,
  //   uzbmb_file: uzbmb?.file ? uzbmb?.file : undefined,
  //   certificate:
  //     isQueryUserPinflDataCertificate?.[0]?.file ??
  //     isQueryUserPinflDataCertificate?.[
  //       isQueryUserPinflDataCertificate?.length - 1
  //     ]?.file,

  //   certification_type:
  //     isQueryUserPinflDataCertificate?.[
  //       isQueryUserPinflDataCertificate?.length - 1
  //     ]?.certification_type,
  // };

  useEffect(() => {
    if (userData) {
      methods.reset({
        institution_type:
          isQueryUserPinflData?.institution_type === "school"
            ? "Maktab"
            : isQueryUserPinflData?.institution_type,
        region: userPinflData?.region || isQueryUserPinflData?.region,
        district_id: userPinflData?.district || isQueryUserPinflData?.district,
        institution_name:
          userPinflData?.institution_name ||
          isQueryUserPinflData?.institution_name,
        document: userPinflData?.document || isQueryUserPinflData?.document,
        certificate:
          isQueryUserPinflDataCertificate?.[0]?.file ??
          isQueryUserPinflDataCertificate?.[
            isQueryUserPinflDataCertificate?.length - 1
          ]?.file,
        certification_type:
          isQueryUserPinflDataCertificate?.[
            isQueryUserPinflDataCertificate?.length - 1
          ]?.certification_type,
        certification_toggle: certificationToggle,
        uzbmb_file: userData?.dtm?.file ? userData?.dtm?.file : undefined,
      });
    }
  }, [userData]);

  const handleClose = () => setResendModal(false);

  // Agar abituryent bakalavr darajasiga topshirayotgan bo'lsa unga uzbm certificatini qo'shsa bo'ladi
  const bakalavr = purposeOfApplication == "abituryent" || is_master == false;

  return (
    <section className="pb-5">
      <Form
        schema={educationalPinflSchema(t)}
        methods={methods}
        onSubmit={onSubmit}
        // defaultValues={userPinflData ? defaultValues : queryDefaultValues}
      >
        <PinflEducationInfo />
        {bakalavr && <UZBM defaultToggle={uzbmb?.id} />}

        <Certificate
          defaultToggle={certificationToggle}
          userData={userData}
          isLoading={isLoading}
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
