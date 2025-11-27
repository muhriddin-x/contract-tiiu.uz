import ReactInputMask from "react-input-mask";
import { Input } from "../Input";
import { forwardRef } from "react";

export const PINFL = forwardRef((props, ref) => {
  return (
    <ReactInputMask mask="99999999999999" maskChar="_" {...props}>
      {() => <Input type="text" {...props} ref={ref} />}
    </ReactInputMask>
  );
});
