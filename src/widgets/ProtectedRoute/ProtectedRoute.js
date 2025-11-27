import { useRouter } from "next/router";
import { useEffect } from "react";

export const ProtectedRoute = ({ redirectURL, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push({
        pathname: "/",
        query: {
          redirect: redirectURL || router.pathname,
        },
      });
      localStorage.clear();
    }
  }, []);

  return children;
};
