import { PINFL as SharedPPINFL } from "@/shared/ui/DataEntry/Input";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const PINFL = forwardRef(({ name, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <SharedPPINFL
          name="name"
          {...props}
          value={value}
          {...field}
          ref={ref}
        />
      )}
    />
  );
});
