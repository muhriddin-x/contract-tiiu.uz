import { Controller, useFormContext } from "react-hook-form";
import { Password as PasswordShare } from "@/shared/ui/DataEntry/Input";

export const Password = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <PasswordShare name={name} {...props} value={value} {...field} />
      )}
    />
  );
};
