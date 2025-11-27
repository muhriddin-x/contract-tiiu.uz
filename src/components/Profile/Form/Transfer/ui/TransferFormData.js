import useTranslation from "next-translate/useTranslation";
import { Form } from "@/shared/ui/HookForm";
import { useRouter } from "next/router";
import { usePost } from "@/pages/api/https";
import { Fields } from "./Fields";
import { transferSchema } from "@/widgets/profile/config/transferSchema";
import uploadFile from "@/shared/lib/uploadFile/uploadFile";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const notifyServerError = () => toast.error("Server error, try again later");

export const TransferFormData = ({ userData }) => {
  const { user_previous_education } = userData;
  let { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const haveApplied = userData?.haveApplied;

  const { having_problem_with_application, having_problem_with_education } =
    userData;

  const onSubmit = async (values) => {
    setIsLoading(true);
    const fileFields = [
      {
        file: values.transcript_file,
        usage: "transcript",
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
      let user_previous_education = {
        country_id: +values.country_id,
        institution_name: values.institution_name,
        direction_name: values.direction_name,
        which_course_now: +values.which_course_now,
        transcript_file: fileFields[0],
      };

      usePost("/v1/application-forms", {
        user_previous_education,
      })
        .then(() => {
          if (!haveApplied) {
            router.push("/profile/select-direction");
          } else if (having_problem_with_application) {
            router.push("/profile/application-status/edit");
          } else {
            router.push("/profile/application-status");
          }
          // router.push("/profile/select-direction");
        })
        .catch(() => {
          notifyServerError();
        })
        .finally(() => {
          setIsLoading(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className=" pb-5">
      <Form
        schema={transferSchema(t)}
        defaultValues={user_previous_education}
        onSubmit={onSubmit}
      >
        <Fields userData={userData} isLoading={isLoading} />
      </Form>
      <Toaster position="top-right" />
    </section>
  );
};
