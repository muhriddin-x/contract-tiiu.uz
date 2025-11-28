import { Layout as Header } from "@/layouts/header/layout";
import { Container } from "@/shared/ui/Container";
import { FormData } from "./ui/FormData";

export const CheckUser = () => {
  return (
    <Header>
      <Container className="  mt-5">
        <FormData />
      </Container>
    </Header>
  );
};
