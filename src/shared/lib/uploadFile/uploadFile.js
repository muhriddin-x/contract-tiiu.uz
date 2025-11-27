import { useDelete, usePost } from "@/pages/api/https";

async function uploadFile(file, photo, url) {
  const formData = new FormData();
  formData.append("associated_with", "users");
  formData.append("usage", file.usage || "avatar");
  formData.append("file", file.file);
  if (photo) {
    useDelete(url ? url : "/v1/files", {
      path: [photo],
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }

  return usePost("/v1/files/upload", formData, "media")
    .then(({ data }) => data.path)
    .catch(() => {})
    .finally(() => {});
}

export default uploadFile;
