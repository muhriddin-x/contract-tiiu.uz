import { imageExtensions } from "@/shared/config/fileExtensions/image";
import { pdfExtension } from "@/shared/config/fileExtensions/pdf";
import { Field } from "@/shared/ui/HookForm/Field";
import { FileInputWithPreview } from "@/shared/ui/HookForm/FileInputWithPreview";
import useTranslation from "next-translate/useTranslation";

export const UZBM = ({ name, label, defaultToggle, userData, ...props }) => {
  let { t } = useTranslation("common");

  const passportExtensions = [...imageExtensions, pdfExtension];

  return (
    <div className="p-6 bg-white rounded-lg mt-5">
      <h2 className="text-[20px] font-semibold">{t("uzbmb.title")}</h2>

      <div className="mt-5">
        <Field label={t("uzbmb.fileUpload")} name="uzbmb_file">
          <FileInputWithPreview
            type="file"
            name="uzbmb_file"
            accept={passportExtensions}
          />
        </Field>
      </div>
    </div>
  );
};
