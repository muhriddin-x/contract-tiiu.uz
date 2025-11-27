import { forwardRef } from "react";

import classes from "./RadioButton.module.css";
import { classNames } from "@/shared/lib/classNames";

export const RadioButton = forwardRef(
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
        <span className={classes.Content}>
          <span className={classes.ContentCircle}></span>
          {children}
        </span>
      </label>
    );
  }
);
