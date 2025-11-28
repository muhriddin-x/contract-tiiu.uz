import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./Sidebar").then((mod) => mod.Sidebar));
export const Layout = ({ page, children }) => {
  return (
    <div className="grid grid-cols-10 gap-5">
      <aside className="sm:block hidden col-span-2">
        <Sidebar page={page} />
      </aside>

      <main className="sm:col-span-8 col-span-10">{children}</main>
    </div>
  );
};
