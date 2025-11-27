import { BirthDate as SharedBirthDate } from "@/shared/ui/DataEntry/Input/BirthDate";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const BirthDate = forwardRef(({ name, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <SharedBirthDate
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
