import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { Status } from "./ui/Status/Status";
import { Applicaiton } from "./ui/Application/Applicaiton";
import { Suspense } from "react";
import { SuspenseLoader } from "@/features/suspence-loader/SuspenceLoader";
import { ProtectedRoute } from "@/widgets/ProtectedRoute";
import { Layout as Sidebar } from "@/layouts/sidebar/ui/layout";
import { useRouter } from "next/router";
import { Comment } from "./ui/Comment/Comment";
import { useGetMyDataQuery } from "@/entities/user";
import { useGetMyApplicationQuery } from "@/entities/myApplication";

export const ApplicationStatus = () => {
  const router = useRouter();
  const { isLoading } = useGetMyDataQuery();
  const { data: state } = useGetMyApplicationQuery();
  if (isLoading) return null;
  const isCommentedStatus = ["edit-reject", "rejected"];

  const isPossibleUpdateProfile = ["pending", "edit-reject"];
  if (!isPossibleUpdateProfile.includes(state?.status)) {
    localStorage.setItem("isNotUpdateProfileStatus", true);
  } else {
    localStorage.removeItem("isNotUpdateProfileStatus");
  }
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ProtectedRoute redirectURL={"/"}>
        <Header>
          <Container className=" !px-0 mt-5">
            <Sidebar page={router.pathname}>
              <Status myApplication={state} />
              {state?.comment?.length > 0 &&
                isCommentedStatus.includes(state?.status) && (
                  <Comment comment={state?.comment[0]} />
                )}
              <Applicaiton myApplication={state} router={router} />
            </Sidebar>
          </Container>
        </Header>
      </ProtectedRoute>
    </Suspense>
  );
};
