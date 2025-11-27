import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { useRouter } from "next/router";
import { useGetMyDataQuery } from "@/entities/user";
import { useGetMyApplicationQuery } from "@/entities/myApplication";
import { SectionHeader } from "./ui/SectionHeader";
import { DownloadContract } from "./ui/DownloadContract";

export const Contract = () => {
  const router = useRouter();
  const { data: state } = useGetMyApplicationQuery();

  return (
    <ProtectedRoute redirectURL={"/"}>
      <Header>
        <Container className=" !px-0 mt-5">
          <Sidebar page={router.pathname}>
            <SectionHeader myApplication={state} />
            <DownloadContract />
          </Sidebar>
        </Container>
      </Header>
    </ProtectedRoute>
  );
};
