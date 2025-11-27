import ReactInputMask from "react-input-mask";
import { Input } from "../Input";
import { forwardRef } from "react";

export const MaskedInput = forwardRef(({ mask, ...props }, ref) => {
  return (
    <ReactInputMask mask={mask} {...props}>
      {() => <Input {...props} ref={ref} />}
    </ReactInputMask>
  );
});
