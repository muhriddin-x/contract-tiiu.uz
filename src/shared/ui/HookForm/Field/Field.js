import { useController } from "react-hook-form";
import { Field as SharedField } from "../../DataEntry/Field";

export const Field = ({
  label,
  name = "",
  required,
  children,
  className,
  wrapperclassname,
}) => {
  const {
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <SharedField
      label={label}
      name={name}
      required={required}
      error={error?.message}
      className={className}
      wrapperclassname={wrapperclassname}
    >
      {children}
    </SharedField>
  );
};
