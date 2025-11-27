import { classNames } from "@/shared/lib/classNames";

export const TabRadioGroupWrapper = ({ column, children, className }) => {
  return (
    <div
      className={classNames(
        "flex",
        {
          "[&>*:first-child]:rounded-l-[5px] [&>*:last-child]:rounded-r-[5px]":
            !column,
          "[&>*:first-child]:rounded-t-[5px] [&>*:last-child]:rounded-b-[5px] inline-flex flex-col":
            column,
        },
        [className]
      )}
    >
      {children}
    </div>
  );
};
