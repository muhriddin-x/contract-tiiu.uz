import { useGetMyDataQuery } from "@/entities/user";
import { useRouter } from "next/router";

export const Redirect = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGetMyDataQuery();

  if (isLoading) return null;
  // if (error?.status === 401) {
  //   router.push("/auth/check-user");
  //   return null;
  // } else if (
  //   data?.haveApplicationForm == true &&
  //   data?.haveEducation == true &&
  //   data?.haveApplied == false
  // ) {
  //   router.push("/profile/select-direction");
  //   return null;
  // } else if (
  //   data?.haveApplicationForm == true &&
  //   data?.haveEducation == true &&
  //   data?.haveApplied == true
  // ) {
  //   router.push("/profile/application-status");
  //   return null;
  // } else if (
  //   data?.haveApplicationForm == true &&
  //   data?.haveEducation == false
  // ) {
  //   router.push("/profile/educational-information");
  //   return null;
  // } else {
  //   router.push("/auth/check-user");
  //   return null;
  // }

  if (error?.status === 401) {
    router.push("/auth/purpose-of-application");
    return null;
  } else if (
    data?.haveApplicationForm == true &&
    data?.haveEducation == true &&
    data?.haveApplied == false
  ) {
    router.push("/profile/select-direction");
    return null;
  } else if (
    data?.haveApplicationForm == true &&
    data?.haveEducation == true &&
    data?.haveApplied == true
  ) {
    router.push("/profile/application-status");
    return null;
  } else if (
    data?.haveApplicationForm == true &&
    data?.haveEducation == false &&
    data?.havePreviousEducation == false
  ) {
    router.push("/profile/educational-information");
    return null;
  } else if (
    data?.haveApplicationForm == true &&
    data?.haveEducation == false &&
    data?.havePreviousEducation == true
  ) {
    router.push("/profile/transfer");
    return null;
  } else {
    router.push("/auth/purpose-of-application");
    return null;
  }
};
