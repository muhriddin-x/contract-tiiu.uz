import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import Image from "next/image";
import { useEffect, useState } from "react";
const { publicRuntimeConfig } = getConfig();

export const Logout = ({ userData }) => {
  let { t } = useTranslation("common");
  const { src } = userData;
  const isManually = src === "manually";

  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const consernedProfile = document.querySelectorAll("#logout");
    window.addEventListener("click", (event) => {
      if (consernedProfile[0]?.contains(event.target) || false) {
        setOpenModal(true);
      } else {
        setOpenModal(false);
      }
    });
  }, []);

  const clickModal = (e) => {
    e.stopPropagation();
    setOpenModal(!openModal);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div id="logout" onClick={clickModal} className="relative cursor-pointer">
      <div className="flex items-center sm:gap-2 gap-1">
        <p className="text-white sm:block hidden">
          {userData?.last_name} {userData?.first_name?.charAt(0)}.
        </p>
        {!isManually && (
          <div className="sm:w-10 sm:h-10 w-8 h-8 rounded-full ">
            <img
              src={`${publicRuntimeConfig.backendUrl}/${userData?.photo}`}
              alt="Preview"
              className="object-cover sm:w-10 sm:h-10 w-8 h-8 rounded-full  "
              accept="image/*"
            />{" "}
          </div>
        )}
        {/* <Image
          src={`/assets/arrow-down.svg`}
          width={15}
          height={15}
          alt="arrow-down"
          className={`${openModal ? "transform rotate-180" : ""}`}
        /> */}
      </div>
      {/* {openModal && (
        <div
          onClick={logout}
          className="absolute w-auto px-5 text-nowrap flex items-center justify-center  gap-2 -bottom-14 right-1 bg-white py-3 rounded-lg shadow"
        >
          <div className="w-5 h-5">
            <Image
              src="/assets/logout.png"
              width={23}
              height={23}
              alt="logout"
            />
          </div>
          <p className="font-medium text-sm sm:text-base">{t("logout")}</p>
        </div>
      )} */}
    </div>
  );
};
