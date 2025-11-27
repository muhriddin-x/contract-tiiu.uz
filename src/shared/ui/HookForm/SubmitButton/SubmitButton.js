import { Button } from "../../Button";

export const SubmitButton = ({ children, ...props }) => (
  <Button {...props}>{children || "Submit"}</Button>
);
