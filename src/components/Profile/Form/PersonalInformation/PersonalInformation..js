import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { ShowPersonalInfo } from "./ui/ShowPersonalInfo";
import { SectionHeader } from "./ui/SectionHeader";
import { StudentMeType } from "@/entities/user/model/MyDataTypes";
import { useMyData } from "@/entities/user/api/useMyData";

export const PersonalInformation = () => {
  const router = useRouter();

  const { data: userData, isLoading } = useMyData(StudentMeType.PERSONAL);

  if (isLoading) return null;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <Sidebar page={router.pathname}>
              <SectionHeader />
              <ShowPersonalInfo userData={userData} />
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
