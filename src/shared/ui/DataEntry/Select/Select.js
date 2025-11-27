import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import { styles } from "./Select.styles";

import { forwardRef } from "react";
import { classNames } from "@/shared/lib/classNames";

export const Select = forwardRef(
  (
    {
      options,
      name,
      error,
      addonBefore,
      addonAfter,
      className,
      creatable,
      roundedFull,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={classNames("flex border", {
          "border-error_color border": error,
          "border-border-color focus-within:border-sky-500": !error,
          "rounded-full": roundedFull,
          "rounded-lg": !roundedFull,
        })}
      >
        {addonBefore && (
          <span className="bg-[#F0F2F5] px-4 py-2.5">{addonBefore}</span>
        )}
        {creatable ? (
          <CreatableSelect
            name={name}
            options={options}
            styles={styles({ radius: roundedFull ? 100 : 8 })}
            className="grow"
            isDisabled={props.disabled}
            formatCreateLabel={(value) => value}
            {...props}
            ref={ref}
          />
        ) : (
          <ReactSelect
            isSearchable={false}
            name={name}
            options={options}
            styles={styles({ radius: roundedFull ? 100 : 8 })}
            className="grow"
            isDisabled={props.disabled}
            {...props}
            ref={ref}
          />
        )}
        {addonAfter && (
          <span className="bg-[#F0F2F5] px-4 py-2.5 whitespace-nowrap">
            {addonAfter}
          </span>
        )}
      </div>
    );
  }
);
