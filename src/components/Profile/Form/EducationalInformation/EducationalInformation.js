import { Layout as Header } from "@/layouts/header/layout";
import { Layout as ProgressBar } from "@/layouts/profile-progress/ui/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { EducationFormData } from "./ui/EducationFormData";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Suspense, useEffect, useState } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { PinflEducationFormData } from "./ui/PinflEducationFormData";
import { useGetMyDataQuery } from "@/entities/user";
import { getLocalStorageItemParse } from "@/shared/lib/getLocalStorageItem";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";

export const EducationInformation = () => {
  const [isManually, setIsManually] = useState(false);
  const router = useRouter();
  const { data: userData, isLoading } = useGetMyDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user_is_pinfl = getLocalStorageItemParse("user_pinfl");

  // agar userda ta'lim ma'lumoti bo'lsa
  // agar userda ta'lim ma'lumti bo'lmasa
  // agar user tizimdan chiqib qayta kirsa
  // agar user tizimdan chiqib qayta kirsa va userda ta'lim ma'lumoti bo'lmagan bo'lsa
  const user_education = userData?.user_education?.src;
  const user_pinfl_passport = user_is_pinfl?.passport?.first_name;
  const user_pinfl_secondary = user_is_pinfl?.secondary?.pinfl_region_id;

  useEffect(() => {
    if (user_pinfl_secondary) {
      setIsManually(false);
    } else if (user_pinfl_passport && !user_pinfl_secondary) {
      setIsManually(true);
    } else if (user_education === "manually" || !user_education) {
      setIsManually(true);
    } else {
      setIsManually(false);
    }
  }, [user_education, user_pinfl_secondary]);

  const applicationFormComplated =
    userData?.user_education ||
    userData?.pinfl_user_education ||
    userData?.user_previous_education;

  if (isLoading) return null;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <Sidebar page={router.pathname}>
              {applicationFormComplated == null && (
                <ProgressBar page={router.pathname} />
              )}
              {isManually ? (
                <EducationFormData userData={userData} />
              ) : (
                <PinflEducationFormData
                  userPinflData={user_is_pinfl?.secondary}
                  userData={userData}
                />
              )}
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
