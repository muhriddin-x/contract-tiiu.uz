import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { FormData } from "./ui/FormData";
import { useEffect } from "react";

export const CheckUser = () => {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  return (
    <Header>
      <Container className="  mt-5">
        <FormData />
      </Container>
    </Header>
  );
};
