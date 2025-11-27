import { PhoneInput as SharedPhoneInput } from "@/shared/ui/DataEntry/Input";
import { Controller, useFormContext } from "react-hook-form";

export const PhoneInput = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <SharedPhoneInput name="name" {...props} value={value} {...field} />
      )}
    />
  );
};
