import { forwardRef } from "react";

import classes from "./Input.module.css";
import { classNames } from "@/shared/lib/classNames";
import Image from "next/image";

export const Input = forwardRef(
  (
    {
      name,
      className = "",
      error,
      addonBefore,
      addonBeforeClassName = "",
      addonAfter,
      addonAfterClassName = "",
      children,
      inputWrapperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={classNames("flex rounded-lg border overflow-hidden", {
          "border-red-500 border": error,
          "border-border-color focus-within:border-sky-500": !error,
        })}
      >
        {addonBefore && (
          <span className={"bg-[#F0F2F5] px-4 py-2.5 " + addonBeforeClassName}>
            {addonBefore}
          </span>
        )}
        <div className={"block w-full relative " + inputWrapperClassName}>
          <input
            name={name}
            autoComplete="new-password"
            ref={ref}
            className={classNames(
              `border-0 block w-full outline-none  px-2 py-2.5 font-medium  ${
                props.disabled ? "!bg-disabled" : "!bg-white"
              }`,
              {},
              [classes.Input, className]
            )}
            id={name}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
          {children}
        </div>
        {addonAfter && (
          <span
            className={
              "bg-disabled sm:px-8 px-5 py-2.5 whitespace-nowrap flex items-center justify-center gap-2 flex-shrink-0" +
              addonAfterClassName
            }
          >
            <Image
              src="/assets/upload-icon.png"
              width={18}
              height={30}
              alt="download"
            />
            <p className="sm:block hidden"> {addonAfter}</p>
          </span>
        )}
      </div>
    );
  }
);
