import ReactInputMask from "react-input-mask";
import { Input } from "../Input";
import { forwardRef } from "react";

export const SerialNumberInput = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <ReactInputMask
      mask="aa 9999999"
      maskChar="_"
      className="uppercase"
      alwaysShowMask
      {...props}
      onChange={(evt) => {
        onChange(evt.target.value.toUpperCase());
        return evt;
      }}
    >
      {() => <Input type="text" {...props} ref={ref} />}
    </ReactInputMask>
  );
});
