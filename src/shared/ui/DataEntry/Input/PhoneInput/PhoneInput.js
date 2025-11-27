import ReactInputMask from "react-input-mask";
import { Input } from "../Input";
import { forwardRef } from "react";

export const PhoneInput = forwardRef(({ ...props }, ref) => {
  return (
    <ReactInputMask mask="+\9\9\8\ 99 999 99 99" {...props}>
      {() => <Input type="tel" {...props} ref={ref} />}
    </ReactInputMask>
  );
});
