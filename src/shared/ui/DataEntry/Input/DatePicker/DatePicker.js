import "flatpickr/dist/themes/material_blue.css";

import Flatpickr from "react-flatpickr";

import { forwardRef } from "react";
import { Input } from "../Input";

export const DatePicker = forwardRef(
  (
    { error, addonBefore, addonAfter, className = "", disabled, ...props },
    ref
  ) => {
    return (
      <div>
        <Flatpickr
          options={{
            // dateFormat: "Y.m.d",
            dateFormat: "d.m.Y",
            locale: {
              firstDayOfWeek: 1,
            },
            disableMobile: false,
          }}
          disabled={false}
          ref={(datePickrRef) =>
            ref(
              datePickrRef?.flatpickr.isMobile
                ? datePickrRef?.flatpickr.mobileInput
                : datePickrRef?.node
            )
          }
          render={(props, ref) => {
            return (
              <Input
                error={error}
                addonBefore={addonBefore}
                addonAfter={addonAfter}
                className={
                  "bg-[url('/icons/calendar.svg')] bg-no-repeat bg-[center_right_12px] " +
                  className
                }
                {...props}
                disabled={false}
                ref={ref}
              />
            );
          }}
          {...props}
        />
      </div>
    );
  }
);
