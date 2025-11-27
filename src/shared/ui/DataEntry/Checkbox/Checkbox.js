import { classNames } from "@/shared/lib/classNames";
import classes from "./Checkbox.module.css";
import { forwardRef } from "react";

export const Checkbox = forwardRef(
  ({ value, children, className = "", ...props }, ref) => {
    return (
      <label
        className={classNames("inline-flex items-center cursor-pointer", {}, [
          className,
        ])}
      >
        <input
          type="checkbox"
          className={"visually-hidden " + classes.Checkbox}
          value={value}
          ref={ref}
          {...props}
        />
        <span className="w-[18px] h-[18px] block border border-[#d9d9d9] rounded-[3px] mr-1.5 "></span>
        <span>{children}</span>
      </label>
    );
  }
);
