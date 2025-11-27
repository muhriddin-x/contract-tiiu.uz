import { Button, ButtonTheme } from "../../Button";

import { useFormContext } from "react-hook-form";

export const ResetButton = ({ defaultValues, size, ...props }) => {
  const { setValue } = useFormContext();

  const handleResetClick = () => {
    Object.entries(defaultValues).forEach(([name, value]) => {
      setValue(name, value, {
        shouldDirty: true,
      });
    });
  };

  return (
    <Button
      type="button"
      outline
      theme={ButtonTheme.DANGER}
      size={size}
      onClick={handleResetClick}
      {...props}
    />
  );
};
