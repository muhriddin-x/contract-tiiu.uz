import { Header } from "@/widgets/header/ui/Header";
import { Fragment } from "react";

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};
