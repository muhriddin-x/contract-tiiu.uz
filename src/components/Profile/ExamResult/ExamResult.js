import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { ResultHeader } from "./ui/ResultHeader";
import { useGet } from "@/pages/api/https";
import { ResultTable } from "./ui/ResultTable";
import getConfig from "next/config";

export const ExamResult = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    useGet("/v1/applicants/my-application")
      .then((res) => {
        setState(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  const router = useRouter();
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" px-3 sm:px-0 mt-5">
            <Sidebar page={router.pathname}>
              <ResultHeader myApplication={state} />
              <ResultTable myApplication={state} getConfig={getConfig} />
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
