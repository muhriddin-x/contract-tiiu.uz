import { useWatch } from "react-hook-form";
import { FileInput } from "../FileInput";

import getConfig from "next/config";
import { pdfExtension } from "@/shared/config/fileExtensions/pdf";
import { ImgWithPdfPreview } from "../../ImgWithPdfPreview";

const { publicRuntimeConfig } = getConfig();

export const FileInputWithPreview = ({ name, ...props }) => {
  const value = useWatch({
    name,
  });

  const img =
    typeof value === "string"
      ? `${publicRuntimeConfig.backendUrl}/${value}`
      : value instanceof Blob
      ? value.name.endsWith(pdfExtension)
        ? value.name
        : URL.createObjectURL(value)
      : null;

  return (
    <FileInput
      name={name}
      {...props}
      addonBefore={
        value && (
          <ImgWithPdfPreview
            className="w-full h-full object-contain object-center"
            src={img}
            srcWithBaseURL={false}
            alt=""
            width={24}
            height={24}
          />
        )
      }
      addonBeforeClassName="shrink-0 !px-1 !py-1 w-[50px] h-[44px]"
    />
  );
};
