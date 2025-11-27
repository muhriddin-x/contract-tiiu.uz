import { useFormContext } from "react-hook-form";
import { RadioButton as SharedRadioButton } from "../../DataEntry/Radio";

export const RadioButton = ({ name, className, children, ...props }) => {
  const { register } = useFormContext();

  return (
    <SharedRadioButton className={className} {...props} {...register(name)}>
      {children}
    </SharedRadioButton>
  );
};
