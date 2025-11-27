import { forwardRef } from "react";

import classes from "./RadioTab.module.css";
import { classNames } from "@/shared/lib/classNames";

export const RadioTab = forwardRef(
  ({ value, children, className = "", ...props }, ref) => {
    return (
      <label
        className={classNames(
          "inline-block cursor-pointer overflow-hidden",
          {},
          [className]
        )}
      >
        <input
          type="radio"
          className={"visually-hidden " + classes.Radio}
          value={value}
          ref={ref}
          {...props}
        />
        <span className={classes.Content}>{children}</span>
      </label>
    );
  }
);
