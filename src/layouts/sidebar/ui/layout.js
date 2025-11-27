import { useGetMyDataQuery } from "@/entities/user";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./Sidebar").then((mod) => mod.Sidebar));
export const Layout = ({ page, children }) => {
  const { data } = useGetMyDataQuery();
  const applicationFormComplated = data?.haveApplied;

  return (
    <div className="grid grid-cols-10 gap-5">
      {applicationFormComplated && (
        <aside className="sm:block hidden col-span-2">
          <Sidebar page={page} />
        </aside>
      )}
      {/* <aside className="sm:block hidden col-span-2">
        <Sidebar page={page} />
      </aside> */}
      <main
        className={` ${
          applicationFormComplated ? "sm:col-span-8 col-span-10" : "col-span-10"
        }`}
      >
        {children}
      </main>
    </div>
  );
};
