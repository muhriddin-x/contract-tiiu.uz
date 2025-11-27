import { useFormContext } from "react-hook-form";
import { RadioTab as SharedRadioTab } from "../../DataEntry/Radio";

export const RadioTab = ({ name, className, children, ...props }) => {
  const { register } = useFormContext();

  return (
    <SharedRadioTab className={className} {...props} {...register(name)}>
      {children}
    </SharedRadioTab>
  );
};
