import { useGetMyDataQuery } from "../api";

export const GetUserData = () => {
  useGetMyDataQuery("/");

  return null;
};
