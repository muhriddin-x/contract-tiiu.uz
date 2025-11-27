import { useFormContext } from "react-hook-form";
import { Radio as SharedRadio } from "../../DataEntry/Radio";

export const Radio = ({ name, className, children, ...props }) => {
  const { register } = useFormContext();

  return (
    <SharedRadio className={className} {...props} {...register(name)}>
      {children}
    </SharedRadio>
  );
};
