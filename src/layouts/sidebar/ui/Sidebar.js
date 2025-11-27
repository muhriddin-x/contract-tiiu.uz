import { SiderMenuData } from "@/entities/layoutData/LayoutData";
import Logout from "@/features/modal/logout/Logout";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Sidebar = ({ page }) => {
  let { t } = useTranslation("common");
  const [openModal, setOpenModal] = useState(false);
  const userData = useSelector((store) => store?.data?.userStore);

  const isActivePage = (path) => {
    if (page.includes(path)) return true;
    else return false;
  };

  if (userData?.havePreviousEducation == true) {
    SiderMenuData[1].path = "/profile/transfer";
  }

  const SidebarMenuData = SiderMenuData.filter((item, index) => {
    if (localStorage.getItem("didTakeTheTest") === "false") {
      return index !== 3;
    }
    return true;
  });
  const handleClose = () => setOpenModal(false);

  return (
    <div className="w-full h-[80vh] bg-white rounded-[10px] py-5 px-2 flex flex-col justify-between">
      <ul className="mt-0">
        {SidebarMenuData.map((item) => {
          return (
            <li
              key={item.id}
              className={`flex items-center justify-between p-3 mt-3 rounded-[6px] ${
                isActivePage(item.path) && "bg-primary text-white"
              }`}
            >
              <Link href={item.path}>
                <div className="flex items-center">
                  <div>{item.icon}</div>

                  <span className="ml-[10px] font-medium">
                    {" "}
                    {t(item.title)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => setOpenModal(true)}
        className="flex gap-2 items-center p-3"
      >
        <Image src="/assets/logout.svg" width={25} height={50} alt="logout" />
        <p className="text-red font-medium">Chiqish</p>
      </button>
      <Logout onClose={handleClose} open={openModal} />
    </div>
  );
};
