import { SiderMenuData } from "@/entities/layoutData/LayoutData";
import Logout from "@/features/modal/logout/Logout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useState } from "react";

export const MobileSidebar = ({ toggle, handleToggle, page, userData }) => {
  let { t } = useTranslation("common");
  const { src } = userData;
  const isManually = src === "manually";

  const [openModal, setOpenModal] = useState(false);
  const SidebarMenuData = SiderMenuData.filter((item, index) => {
    if (localStorage.getItem("didTakeTheTest") === "false") {
      return index !== 3;
    }
    return true;
  });
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => {
    setOpenModal(true);
    handleToggle();
  };
  return (
    <div className="">
      <div
        onClick={handleToggle}
        className={`relative flex flex-col gap-[4px]  ${
          toggle ? "-mt-2 " : ""
        }`}
      >
        <div
          className={`px-3 py-[1px] bg-white block rounded-lg duration-300 ${
            toggle ? "rotate-45 mt-2" : "rotate-0"
          }`}
        ></div>
        <div
          className={`px-3 py-[1px] bg-white block rounded-lg duration-300 ${
            toggle ? "bg-transparent" : "bg-white"
          }`}
        ></div>
        <div
          className={`px-3 py-[1px] bg-white block rounded-lg duration-300 ${
            toggle ? "-rotate-45 -mt-3" : "rotate-0"
          }`}
        ></div>
      </div>

      <div className={` relative ${toggle ? "visible" : "invisible"} `}>
        <div
          className={`fixed top-0 px-3 h-screen w-4/5 bg-primary  z-[1000] overflow-y-auto pb-10 sm:px-10 duration-500 transition-all ${
            toggle ? "left-0" : "left-[-80%]"
          }`}
        >
          <div className="flex items-center mt-5  gap-2">
            <div
              onClick={handleToggle}
              className="flex flex-col gap-[4px] w-6 "
            >
              <div
                className={`px-1 py-[1px] bg-white relative duration-700 rounded-lg ${
                  toggle ? "rotate-45 top-[8px]" : "rotate-0"
                }`}
              ></div>
              <div
                className={`px-1 py-[1px] relative bg-white mt-[6px] duration-700 rounded-lg ${
                  toggle ? "-rotate-45 -top-[4px]" : "rotate-0"
                }`}
              ></div>
            </div>
            <div className="flex ">
              <p className="text-white mt-2">
                {userData?.last_name} {userData?.first_name?.charAt(0)}.
              </p>
            </div>

            {/* <Link href="https://tiiu.uz/" className="mt-2">
              <Image
                src="/assets/univer-logo.svg"
                width={58}
                height={40}
                alt="Univer logo"
              />
            </Link> */}
          </div>

          <ul className="mt-5">
            {SidebarMenuData.map((item) => {
              return (
                <li
                  key={item.id}
                  className={`flex items-center justify-between p-3 mt-3 rounded-[6px] ${
                    page == item.path ? "bg-white text-primary" : "text-white"
                  }`}
                >
                  <Link href={item.path}>
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2 font-medium"> {t(item.title)}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
            <button
              onClick={handleOpen}
              className="flex gap-2 items-center p-3 mt-3"
            >
              {LogoutImage()}
              <p className="text-white font-medium">Chiqish</p>
            </button>
          </ul>
          <div className="">
            {" "}
            {/* <button
              onClick={handleOpen}
              className="flex gap-2 items-center p-3"
            >
              {LogoutImage()}
              <p className="text-white">Chiqish</p>
            </button> */}
          </div>
        </div>
      </div>
      <Logout onClose={handleClose} open={openModal} />
    </div>
  );
};

function LogoutImage() {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.7595 1.72953H8.8895C13.3295 1.72953 15.4695 3.47953 15.8395 7.39953C15.8795 7.80953 15.5795 8.17953 15.1595 8.21953C14.7595 8.25953 14.3795 7.94953 14.3395 7.53953C14.0495 4.39953 12.5695 3.22953 8.8795 3.22953H8.7495C4.6795 3.22953 3.2395 4.66953 3.2395 8.73953L3.2395 15.2595C3.2395 19.3295 4.6795 20.7695 8.7495 20.7695H8.8795C12.5895 20.7695 14.0695 19.5795 14.3395 16.3795C14.3895 15.9695 14.7395 15.6595 15.1595 15.6995C15.5795 15.7295 15.8795 16.0995 15.8495 16.5095C15.5095 20.4895 13.3595 22.2695 8.8895 22.2695H8.7595C3.8495 22.2695 1.7495 20.1695 1.7495 15.2595L1.7495 8.73953C1.7495 3.82953 3.8495 1.72953 8.7595 1.72953Z"
          fill="#ffff"
        />
        <path
          d="M9.00086 11.25L20.3809 11.25C20.7909 11.25 21.1309 11.59 21.1309 12C21.1309 12.41 20.7909 12.75 20.3809 12.75L9.00086 12.75C8.59086 12.75 8.25086 12.41 8.25086 12C8.25086 11.59 8.59086 11.25 9.00086 11.25Z"
          fill="#ffff"
        />
        <path
          d="M18.1505 7.90016C18.3405 7.90016 18.5305 7.97016 18.6805 8.12016L22.0305 11.4702C22.3205 11.7602 22.3205 12.2402 22.0305 12.5302L18.6805 15.8802C18.3905 16.1702 17.9105 16.1702 17.6205 15.8802C17.3305 15.5902 17.3305 15.1102 17.6205 14.8202L20.4405 12.0002L17.6205 9.18016C17.3305 8.89016 17.3305 8.41016 17.6205 8.12016C17.7605 7.97016 17.9605 7.90016 18.1505 7.90016Z"
          fill="#ffff"
        />
      </svg>
    </div>
  );
}
