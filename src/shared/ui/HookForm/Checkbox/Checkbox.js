import { useFormContext, useWatch } from "react-hook-form";
import { Checkbox as SharedCheckbox } from "../../DataEntry/Checkbox";

export const Checkbox = ({ name, className, children, ...props }) => {
  const { register } = useFormContext();
  const checkedItems = useWatch({ name });

  if (name === "institution_category_id") {
    // console.log(checkedItems, name, props);
  }

  return (
    <SharedCheckbox className={className} {...props} {...register(name)}>
      {children}
    </SharedCheckbox>
  );
};
