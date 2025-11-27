import { VerificationCode as SharedVerification } from "@/shared/ui/DataEntry/Input";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const VerificationCode = forwardRef(({ name, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <SharedVerification
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
