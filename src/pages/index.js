import { CheckUser } from "@/components/Auth/CheckUser";
import { Redirect } from "@/components/Redirect";
import { Layout } from "@/layouts/header/layout";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  return (
    <Layout>
      <Redirect />
      {/* <CheckUser /> */}
    </Layout>
  );
}
