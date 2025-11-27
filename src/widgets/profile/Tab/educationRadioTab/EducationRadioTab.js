import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const EducationRadioTab = ({
  setToggle,
  defaultToggle,
  name,
  options,
}) => {
  const { t } = useTranslation("common");
  const { register } = useFormContext();
  const [selectedValue, setSelectedValue] = useState(
    defaultToggle ? options[1].value : options[0].value
  );

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    setToggle(value === options[1].value);
  };

  return (
    <div className="flex xl:flex-nowrap flex-wrap xl:gap-10 gap-5 items-center mt-5">
      {options.map((option, index) => (
        <div key={option.value} className="flex gap-2 items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            id={`${name}_${index}`}
            checked={selectedValue === option.value}
            className="education-radio text-secondary font-medium cursor-pointer"
            {...register(name)}
            onChange={handleRadioChange}
          />
          <label
            htmlFor={`${name}_${index}`}
            className={`cursor-pointer ${
              selectedValue === option.value ? "text-blue font-medium" : ""
            }`}
          >
            {/* {option.label} */}
            {t(option.label)}
          </label>
        </div>
      ))}
    </div>
  );
};
