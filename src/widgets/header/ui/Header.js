"use client";

import { useGetMyDataQuery } from "@/entities/user";
import { MobileSidebar } from "@/layouts/sidebar/ui/MobileSidebar";
import { Container } from "@/shared/ui/Container";
import { Logout } from "@/widgets/logout";
import { SwitchLanguage } from "@/widgets/switchLanguage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userData } from "../../../../store/counterSlice";
import { useMyData } from "@/entities/user/api/useMyData";
import { StudentMeType } from "@/entities/user/model/MyDataTypes";

export const Header = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { data } = useMyData(StudentMeType.PERSONAL);
  useEffect(() => {
    dispatch(userData(data));
    localStorage.setItem(
      "didTakeTheTest",
      JSON.stringify(data?.didTakeTheTest)
    );
  }, [router]);

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <header className="py-3 bg-primary">
      <Container>
        <div className="flex justify-between items-center">
          <div className="sm:hidden flex items-center gap-3">
            <div>
              {data && (
                <MobileSidebar
                  userData={data}
                  handleToggle={handleToggle}
                  toggle={toggle}
                  setToggle={setToggle}
                  page={router.pathname}
                />
              )}
            </div>
            <Link href="https://tiiu.uz/">
              <Image
                src="/assets/univer-logo.svg"
                width={55}
                height={20}
                alt="Univer logo"
                priority
              />
            </Link>
          </div>
          <Link href="https://tiiu.uz/" className="sm:block hidden">
            <Image
              src="/assets/univer-logo.svg"
              width={65}
              height={40}
              alt="Univer logo"
              priority
            />
          </Link>

          <div className="flex items-center sm:gap-3 gap-0">
            {/* <SwitchLanguage /> */}
            {data?.first_name && <Logout userData={data} />}
          </div>
        </div>
      </Container>
      <div
        onClick={handleToggle}
        className={`fixed inset-0 flex items-center justify-center z-10 bg-black opacity-40 ${
          toggle ? "visible" : "invisible"
        }`}
      ></div>
    </header>
  );
};
