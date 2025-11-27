import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { EditApplicationFormData } from "./ui/EditApplicationFormData";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { useGetMyDataQuery } from "@/entities/user";

export const EditApplication = () => {
  const { data: userData, isLoading } = useGetMyDataQuery();
  if (isLoading) return null;
  const router = useRouter();

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <Sidebar page={router.pathname}>
              <EditApplicationFormData userData={userData} />
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
