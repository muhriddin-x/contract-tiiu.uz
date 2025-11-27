import { classNames } from "@/shared/lib/classNames";

export const DefaultRadioGroupWrapper = ({ column, className, children }) => (
  <div
    className={classNames("flex flex-wrap gap-4", { "flex-col": column }, [
      className,
    ])}
  >
    {children}
  </div>
);
