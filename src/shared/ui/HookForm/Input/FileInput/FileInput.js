import { Controller, useFormContext } from "react-hook-form";
import { FileInput as SharedFileInput } from "@/shared/ui/DataEntry/Input";

export const FileInput = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, name, ...field } }) => {
        const fileName = typeof value === "string" ? value : value?.name;
        return (
          <SharedFileInput
            {...props}
            {...field}
            fileName={fileName}
            onChange={(event) => onChange(event.target.files[0])}
            name={name}
          />
        );
      }}
    ></Controller>
  );
};
