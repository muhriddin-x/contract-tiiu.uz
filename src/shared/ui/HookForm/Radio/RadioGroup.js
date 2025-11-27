import { useWatch } from "react-hook-form";

import { RadioTypes, WrapperElements } from "../../DataEntry/Radio";

import { Radio } from "./Radio";
import { RadioTab } from "./RadioTab";
import { RadioButton } from "./RadioButton";

const RadioElements = {
  [RadioTypes.default]: Radio,
  [RadioTypes.tab]: RadioTab,
  [RadioTypes.button]: RadioButton,
};

export const RadioGroup = ({
  options = [],
  column = false,
  name,
  radioType = RadioTypes.default,
  className,
  defaultValue,
}) => {
  const checkedValue = useWatch({
    name,
  });
  const Option = RadioElements[radioType];
  const Wrapper = WrapperElements[radioType];
  return (
    <Wrapper column={column} className={className}>
      {options.map(({ value, ...option }) => (
        <Option
          key={value}
          checked={checkedValue == value}
          value={value}
          name={name}
          {...option}
        >
          {option.label}
        </Option>
      ))}
    </Wrapper>
  );
};
