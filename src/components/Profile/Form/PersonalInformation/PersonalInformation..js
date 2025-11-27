import { Layout as Header } from "@/layouts/header/layout";
import { Layout as ProgressBar } from "@/layouts/profile-progress/ui/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { FormData as Automatic } from "./ui/Automatic/FormData";
import { FormData as Manually } from "./ui/Manually/FormData";

import { Suspense, useEffect, useState } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { useGetMyDataQuery } from "@/entities/user";
import { getLocalStorageItemParse } from "@/shared/lib/getLocalStorageItem";

export const PersonalInformation = () => {
  const router = useRouter();
  const { data: myData, isLoading } = useGetMyDataQuery();
  const storeProfile = getLocalStorageItemParse("user_pinfl");
  const [typeOfProfile, setTypeOfProfile] = useState("");

  useEffect(() => {
    if (
      storeProfile?.passport?.citizenship ||
      myData?.user_education_src == "automatic"
    ) {
      setTypeOfProfile("TYPE_AUTOMATIC");
    } else {
      setTypeOfProfile("TYPE_MANNUAL");
    }
  }, [myData]);

  const applicationFormComplated =
    myData?.user_education?.src ||
    myData?.pinfl_user_education?.src ||
    myData?.havePreviousEducation ||
    myData?.user_previous_education;

  if (isLoading) return null;
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <Sidebar page={router.pathname}>
              {!applicationFormComplated && (
                <ProgressBar page={router.pathname} />
              )}
              {typeOfProfile == "TYPE_AUTOMATIC" ? (
                <Automatic myData={myData} />
              ) : (
                <Manually myData={myData} />
              )}
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
