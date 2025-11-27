import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { useEffect } from "react";
import { FormData } from "./ui/FormData";

export const PurposeOfApplication = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Header>
      <Container className=" mt-5">
        <FormData />
      </Container>
    </Header>
  );
};
