import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { Layout as Header } from "@/layouts/header/layout";
import { Layout as ProgressBar } from "@/layouts/profile-progress/ui/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { SelectDirectionFormData } from "./ui/SelectDirectionFormData";

export const SelectDirection = () => {
  const router = useRouter();
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <ProgressBar page={router.pathname} />
            {/* <h1>asd</h1> */}
            <SelectDirectionFormData />
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
