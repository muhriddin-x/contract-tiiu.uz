import { Controller, useFormContext } from "react-hook-form";

import { Select as SharedSelect } from "../../DataEntry/Select";

export const Select = ({ name, options = [], ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <SharedSelect
            name={name}
            error={error}
            options={options}
            {...props}
            value={
              options.find((c) => c.value == value) ||
              (props.creatable && value ? { label: value, value } : null)
            }
            onChange={(data) => {
              return onChange(data?.value || null);
            }}
            ref={ref}
          />
        );
      }}
    ></Controller>
  );
};
