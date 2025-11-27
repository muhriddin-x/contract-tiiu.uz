import { Layout as Header } from "@/layouts/header/layout";
import { Layout as ProgressBar } from "@/layouts/profile-progress/ui/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Suspense, useState } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { useGetMyDataQuery } from "@/entities/user";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { TransferFormData } from "./ui/TransferFormData";

export const TransferInformation = () => {
  const router = useRouter();
  const { data: userData, isLoading } = useGetMyDataQuery();
  const [isManually, setIsManually] = useState(false);

  const applicationFormComplated =
    userData?.user_education ||
    userData?.pinfl_user_education ||
    userData?.havePreviousEducation;
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
              <TransferFormData userData={userData} />
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
