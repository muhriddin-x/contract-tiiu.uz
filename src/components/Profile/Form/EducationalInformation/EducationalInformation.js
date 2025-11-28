import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Suspense } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { SectionHeader } from "./ui/SectionHeader";
import { ShowEduInfo } from "./ui/ShowEduInfo";
import { StudentMeType } from "@/entities/user/model/MyDataTypes";
import { useMyData } from "@/entities/user/api/useMyData";

export const EducationInformation = () => {
  const router = useRouter();

  const { data: userData, isLoading } = useMyData(StudentMeType.EDUCATION);

  if (isLoading) return null;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <Sidebar page={router.pathname}>
              <SectionHeader />
              <ShowEduInfo userData={userData} />
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
