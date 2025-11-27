import { useEffect, useState } from "react";

import { Radio } from "../Radio";
import { RadioTab } from "../RadioTab";
import { RadioButton } from "../RadioButton";

import {
  ButtonRadioGroupWrapper,
  TabRadioGroupWrapper,
  DefaultRadioGroupWrapper,
} from "./Wrappers";

export const RadioTypes = {
  default: "default",
  tab: "tab",
  button: "button",
};

export const RadioElements = {
  [RadioTypes.default]: Radio,
  [RadioTypes.tab]: RadioTab,
  [RadioTypes.button]: RadioButton,
};

export const WrapperElements = {
  [RadioTypes.default]: DefaultRadioGroupWrapper,
  [RadioTypes.tab]: TabRadioGroupWrapper,
  [RadioTypes.button]: ButtonRadioGroupWrapper,
};

export const RadioGroup = ({
  options = [],
  column = false,
  defaultValue,
  value,
  name,
  onChange,
  radioType = RadioTypes.default,
  className,
}) => {
  const [checkedItem, setCheckedItem] = useState(defaultValue);

  useEffect(() => {
    if (value != null) {
      setCheckedItem(value);
    }
  }, [value]);

  const handleGroupChange = (checkedValue) => {
    setCheckedItem(checkedValue);

    if (onChange) {
      onChange(checkedValue);
    }
    if (!value) {
      setCheckedItem(checkedValue);
    }
  };

  const Option = RadioElements[radioType];
  const Wrapper = WrapperElements[radioType];

  return (
    <Wrapper column={column} className={className}>
      {options.map(({ value, ...option }) => (
        <Option
          key={value}
          value={value}
          name={name}
          checked={checkedItem === value}
          onChange={(evt) => handleGroupChange(value, evt)}
          {...option}
        >
          {option.label}
        </Option>
      ))}
    </Wrapper>
  );
};
