import { Input } from "../Input";
import { forwardRef, useState } from "react";
import Image from "next/image";

export const Password = forwardRef(({ type, ...props }, ref) => {
  const [isPasswordShown, setPasswordShown] = useState(false);

  return (
    <div className="relative">
      <Input
        type={isPasswordShown ? "text" : "password"}
        {...props}
        ref={ref}
      />
      {isPasswordShown ? (
        <Image
          src="/assets/eye.svg"
          width={25}
          height={50}
          alt="image"
          className="absolute right-2 top-3"
          onClick={() => setPasswordShown(!isPasswordShown)}
        />
      ) : (
        <Image
          src="/assets/eye-slash.svg"
          width={25}
          height={50}
          alt="image"
          className="absolute right-2 top-3"
          onClick={() => setPasswordShown(!isPasswordShown)}
        />
      )}
    </div>
  );
});
