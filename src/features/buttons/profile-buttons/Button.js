"use client";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";

export const Button = ({ isNotBack, className, loading, text }) => {
  const router = useRouter();
  let { t } = useTranslation("common");
  const backToPreviousPage = () => {
    router.back();
  };
  return (
    <div
      className={`flex w-full sm:justify-end xl:w-auto xl:flex-nowrap flex-wrap justify-center sm:flex-row flex-col-reverse gap-5 ${className}`}
    >
      {!isNotBack && (
        <button
          type="button"
          onClick={backToPreviousPage}
          className="sm:w-[200px] w-full h-12 border border-btnGray rounded-lg"
        >
          {t("button.back")}
        </button>
      )}
      {text?.length ? (
        <button
          disabled={loading}
          type="submit"
          className=" w-full h-12  bg-secondary text-white rounded-lg flex items-center justify-center gap-1"
        >
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="28"
              visible={true}
            />
          ) : (
            <>
              <p> {text}</p>
            </>
          )}
        </button>
      ) : (
        <button
          disabled={loading}
          type="submit"
          className="sm:w-[200px] w-full h-12  bg-secondary text-white rounded-lg flex items-center justify-center gap-1"
        >
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="28"
              visible={true}
            />
          ) : (
            <>
              <p> {t("button.continue")}</p>
              <Image
                src="/assets/arrow-right.svg"
                width={23}
                height={23}
                alt="image"
              />
            </>
          )}
        </button>
      )}
    </div>
  );
};
