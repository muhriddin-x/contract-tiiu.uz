import { MaskedInput as SharedMaskedInput } from "@/shared/ui/DataEntry/Input/MaskedInput";
import { Controller, useFormContext } from "react-hook-form";

export const MaskedInput = ({ name, mask, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <SharedMaskedInput mask={mask} {...props} value={value} {...field} />
      )}
    />
  );
};
