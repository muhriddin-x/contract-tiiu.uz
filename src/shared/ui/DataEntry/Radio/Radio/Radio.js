import { forwardRef } from "react";

import classes from "./Radio.module.css";
import { classNames } from "@/shared/lib/classNames";

export const Radio = forwardRef(
  ({ value, children, className = "", ...props }, ref) => {
    return (
      <label
        className={classNames("inline-flex items-center cursor-pointer", {}, [
          className,
        ])}
      >
        <input
          type="radio"
          className={"visually-hidden " + classes.Radio}
          value={value}
          ref={ref}
          {...props}
        />
        <span className="w-[18px] h-[18px] block border border-[#d9d9d9] rounded-full mr-1.5 "></span>
        <span>{children}</span>
      </label>
    );
  }
);
