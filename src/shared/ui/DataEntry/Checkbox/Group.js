import { classNames } from "@/shared/lib/classNames";
import { Checkbox } from "./Checkbox";
import { useEffect, useState } from "react";

export const CheckboxGroup = ({
  options,
  column = false,
  defaultValue,
  value,
  onChange,
  children,
}) => {
  const [checkedItems, setCheckedItems] = useState(defaultValue || []);

  useEffect(() => {
    if (value != null) {
      setCheckedItems(value);
    }
  }, [value]);

  const handleGroupChange = (evt) => {
    const itemValue = evt.target.value;

    let newCheckedItems = [];

    if (checkedItems.includes(itemValue)) {
      newCheckedItems = checkedItems.filter((item) => item !== itemValue);
    } else {
      newCheckedItems = [...checkedItems, itemValue];
    }

    if (onChange) {
      onChange(newCheckedItems);
    }
    if (!value) {
      setCheckedItems(newCheckedItems);
    }
  };

  return (
    <div onChange={handleGroupChange}>
      {children ? (
        children
      ) : (
        <div
          className={classNames("flex flex-wrap gap-4", { "flex-col": column })}
        >
          {options?.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              checked={checkedItems.some((item) => item == option.value)}
            >
              {option.label}
            </Checkbox>
          ))}
        </div>
      )}
    </div>
  );
};
