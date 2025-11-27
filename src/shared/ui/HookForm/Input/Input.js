import { useFormContext } from "react-hook-form";
import { Input as SharedInput } from "../../DataEntry/Input";
import { FileInput } from "./FileInput";
import { PhoneInput } from "./PhoneInput";
import { PINFL } from "./PINFL";
import { SerialNumberInput } from "./SerialNumberInput";
import { Password } from "./Password";
import { VerificationCode } from "./VerificationCode";
import { BirthDate } from "./BirthDate";

const InputComponents = {
  file: FileInput,
  tel: PhoneInput,
  pinfl: PINFL,
  serialNumber: SerialNumberInput,
  password: Password,
  verificationCode: VerificationCode,
  birthDate: BirthDate,
};

const getInputComponent = (type) => InputComponents[type] ?? SharedInput;

export const Input = ({ name, type = "text", ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const Element = getInputComponent(type);

  return (
    <Element
      {...{
        name: name,
        error: error,
        type: type,
        ...props,
        ...register(name),
      }}
    />
  );
};
