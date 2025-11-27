import Image from "next/image";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const ImgWithPdfPreview = ({
  src = "",
  srcWithBaseURL = true,
  className = "",
  ...props
}) => {
  const url = srcWithBaseURL ? `${publicRuntimeConfig.backendUrl}/${src}` : src;

  if (!src) return null;

  return (
    <a href={url} target="_blank">
      <Image
        className={"object-contain object-top " + className}
        src={src?.endsWith?.("pdf") ? "/pdf.png" : url}
        {...props}
      />
    </a>
  );
};
