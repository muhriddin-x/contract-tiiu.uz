import { usePost } from "@/pages/api/https";
import { useEffect } from "react";
export function PostCertification({ file, certificationType }) {
  console.log("file", file);
  useEffect(() => {
    usePost("/v1/certifications", {
      file: file,
      certification_type: certificationType,
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }, [file, certificationType]);

  return null; // or you can return some loading indicator or placeholder component
}
