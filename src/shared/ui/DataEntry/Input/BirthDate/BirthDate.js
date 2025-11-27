import ReactInputMask from "react-input-mask";
import { Input } from "../Input";
import { forwardRef } from "react";

export const BirthDate = forwardRef((props, ref) => {
  return (
    <ReactInputMask mask="99-99-9999" maskChar="" {...props}>
      {() => <Input type="number" {...props} ref={ref} />}
    </ReactInputMask>
  );
});
