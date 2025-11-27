import { Controller, useFormContext, useFormState } from "react-hook-form";
import { DatePicker as SharedDatePicker } from "../../DataEntry/Input";
import { useEffect, useReducer, useRef } from "react";

export const DatePicker = ({ name, ...props }) => {
  const { control } = useFormContext();

  const { errors } = useFormState();

  const wrapperRef = useRef();

  // useEffect(() => {
  //   if (errors[name]) {
  //     wrapperRef.current?.scrollIntoView?.(false);
  //   }
  // }, [errors[name]]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, ref, ...field },
        fieldState: { error },
      }) => (
        <div ref={wrapperRef}>
          <SharedDatePicker
            value={value}
            onChange={onChange}
            error={error}
            {...props}
            {...field}
            ref={ref}
          />
        </div>
      )}
    />
  );
};
