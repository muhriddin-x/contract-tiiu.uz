import { classNames } from "@/shared/lib/classNames";
import { Checkbox } from "./Checkbox";

export const CheckboxGroup = ({ name, options, column }) => {
  return (
    <div className={classNames("flex flex-wrap gap-4", { "flex-col": column })}>
      {options?.map((option) => (
        <Checkbox key={option.value} name={name} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};
