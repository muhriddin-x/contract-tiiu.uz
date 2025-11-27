import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export const SwitchLanguage = () => {
  let { t, lang } = useTranslation();
  const [state, setState] = useState(false);
  const router = useRouter();
  const changeLanguage = () => {
    setState(!state);
  };

  useEffect(() => {
    const concernedOpen = document.querySelectorAll("#languages");
    document.addEventListener("click", (event) => {
      if (concernedOpen[0]?.contains(event.target) || false) {
        setState(true);
      } else {
        setState(false);
      }
    });
  }, []);
  return (
    <div className="relative text-center">
      <div
        id="languages"
        onClick={(e) => {
          e.stopPropagation();
          setState((prev) => !prev);
        }}
        className="px-3 py-2 cursor-pointer flex sm:gap-3 gap-1"
      >
        {" "}
        <Image
          src={`/assets/flag_${lang}.svg`}
          width={25}
          height={25}
          alt="Flag"
        />
        <p className="text-white">
          {lang == "uz" ? "Uz" : lang == "ru" ? "Ру" : "En"}
        </p>
        <Image
          src={`/assets/arrow-down.svg`}
          width={15}
          height={15}
          alt="arrow-down"
          className={`${state ? "transform rotate-180" : ""}`}
        />
      </div>
      {state && (
        <div className="absolute  bg-white px-3 py-2  [&>*:nth-child(2)]:mt-1 border-primary border text-text_small text-center rounded-md font-poppins ">
          {router.locales
            .filter((item) => item != lang)
            .map((locale, index) => (
              <button onClick={changeLanguage} key={index}>
                <Link
                  className="flex items-center gap-2 "
                  href={router.asPath}
                  locale={locale}
                >
                  <Image
                    src={`/assets/flag_${locale}.svg`}
                    width={25}
                    height={25}
                    alt="Flag"
                  />
                  <p className="capitalize font-semibold text-primary">
                    {" "}
                    {locale == "uz" ? "Uz" : locale == "ru" ? "Ру" : "En"}
                  </p>
                </Link>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
